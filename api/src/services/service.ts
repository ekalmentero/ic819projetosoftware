import { BaseDatabase } from "../../prisma/BaseDatabase";
import { Service } from "@prisma/client";

//service service lmfao
export default class ServiceService {
  static async getAllServices() {
    try {
      const services = await BaseDatabase.service.findMany({
        select: {
          id: true,
          startDate: true,
          endDate: true,
          roomNumber: true,
          finished: true,
          pet: {
            select: {
              user: {
                select: {
                  cpf: true,
                },
              },
            },
          },
          room: {
            select: {
              available: true,
            },
          },
        },
      });

      return {
        data: services,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error:
          "Houve um problema ao buscar os serviços. Tente novamente mais tarde.",
      };
    }
  }

  static async getClientServices(userId: number) {
    const calculateServiceValue = (startDate: string, endDate: string) => {
      const valorDiario = 70;
      const umDiaEmMilissegundos = 24 * 60 * 60 * 1000;
      const data1SemHora = new Date(endDate);
      data1SemHora.setUTCHours(9, 0, 0, 0);
      const data2SemHora = new Date(startDate);
      data2SemHora.setUTCHours(9, 0, 0, 0);
      const diferencaEmMilissegundos = Math.abs(
        data1SemHora.getTime() - data2SemHora.getTime()
      );
      const diferencaEmDias = Math.round(
        diferencaEmMilissegundos / umDiaEmMilissegundos
      );
      return diferencaEmDias * valorDiario;
    };
    try {
      const services = await BaseDatabase.service.findMany({
        select: {
          id: true,
          startDate: true,
          endDate: true,
          roomNumber: true,
          finished: true,
          pet: {
            select: {
              name: true,
              species: true,
            },
          },
        },
        where: {
          userId,
        },
      });

      return {
        data: services.map((s: any) => ({
          ...s,
          value: calculateServiceValue(s.startDate, s.endDate),
        })),
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error:
          "Houve um problema ao buscar os serviços. Tente novamente mais tarde.",
      };
    }
  }

  static async schedule(service: Service) {
    if (
      !service.startDate ||
      !service.endDate ||
      !service.petId ||
      !service.roomNumber
    ) {
      return {
        data: null,
        status: 400,
        error: "Informações insuficientes.",
      };
    }

    service.startDate = new Date(service.startDate);
    service.startDate.setHours(
      service.startDate.getHours() - service.startDate.getTimezoneOffset() / 60
    );
    service.endDate = new Date(service.endDate);
    service.endDate.setHours(
      service.endDate.getHours() - service.endDate.getTimezoneOffset() / 60
    );

    if (
      service.endDate <= service.startDate ||
      service.startDate.setHours(9, 0, 0, 0) <
        new Date().setHours(9, 0, 0, 0) ||
      service.endDate.setHours(9, 0, 0, 0) < new Date().setHours(9, 0, 0, 0)
    ) {
      return {
        data: null,
        status: 400,
        error:
          "A data de fim deve ser pelo menos um dia maior que a data de início.",
      };
    }
    try {
      const currentServices = await BaseDatabase.service.findMany({
        select: {
          startDate: true,
          endDate: true,
        },
        where: {
          roomNumber: service.roomNumber,
          finished: false,
          OR: [
            // serviço novo dentro do atual
            {
              startDate: { lte: service.startDate },
              endDate: { gt: service.startDate },
            },

            // começa fora e termina dentro do atual
            {
              startDate: { lt: service.endDate },
              endDate: { gte: service.endDate },
            },

            // serviço novo começa e termina fora do atual
            {
              startDate: { gte: service.startDate },
              endDate: { lte: service.endDate },
            },

            // serviço começa dentro e termina fora do atual
            {
              startDate: { lte: service.startDate },
              endDate: { gte: service.endDate },
            },
          ],
        },
      });

      if (currentServices.length) {
        return {
          data: null,
          status: 400,
          error: "Período indisponível para este quarto.",
        };
      }

      const scheduled = await BaseDatabase.service.create({ data: service });
      return {
        data: scheduled,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error:
          "Houve um problema ao agendar seu serviço. Tente novamente mais tarde.",
      };
    }
  }

  static async finishService(id: number) {
    if (!id) {
      return {
        data: null,
        status: 400,
        error: "Informações insuficientes.",
      };
    }

    try {
      await BaseDatabase.service.update({
        where: {
          id,
        },
        data: {
          finished: true,
          room: {
            update: {
              available: true,
            },
          },
        },
      });
      return {
        data: (await this.getAllServices()).data,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao finalizar o serviço.",
      };
    }
  }

  static async confirmCheckIn(id: number) {
    if (!id) {
      return {
        data: null,
        status: 400,
        error: "Informações insuficientes.",
      };
    }

    try {
      const service = await BaseDatabase.service.findFirst({
        where: {
          id,
        },
      });
      if (!service) {
        return {
          data: null,
          status: 400,
          error: "Serviço não encontrado.",
        };
      }
      const roomNumber = service.roomNumber;
      await BaseDatabase.room.update({
        where: {
          number: roomNumber,
        },
        data: {
          available: false,
        },
      });
      return {
        data: (await this.getAllServices()).data,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao confirmar o check-in.",
      };
    }
  }
}
