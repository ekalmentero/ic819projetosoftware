import { BaseDatabase } from "../../prisma/BaseDatabase";

export default class RoomService {
  static async getAll() {
    try {
      const services = await BaseDatabase.room.findMany({
        select: {
          number: true,
          available: true,
          services: {
            select: {
              pet: {
                select: {
                  name: true,
                  species: true,
                  user: {
                    select: {
                      name: true,
                      phone: true,
                    },
                  },
                },
              },
              endDate: true,
              startDate: true,
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
          "Houve um problema ao buscar os quartos. Tente novamente mais tarde.",
      };
    }
  }

  // retornar os quartos disponiveis
  static async getAvailable(hotelId: number) {
    if (!hotelId) {
      return {
        data: null,
        status: 400,
        error: "Informações insuficientes.",
      };
    }
    try {
      const availableRooms = await BaseDatabase.room.findMany({
        select: { number: true },
        where: { available: true, hotelId },
      });
      let unavailability: any[] = [];
      for (let room of availableRooms) {
        const services = await BaseDatabase.service.findMany({
          select: {
            startDate: true,
            endDate: true,
          },
          where: {
            roomNumber: room.number,
            finished: false,
            endDate: {
              gt: new Date(new Date().setHours(0, 0, 0, 0)),
            },
          },
        });

        let notAvailableAt = [];

        for (let service of services) {
          const start = service.startDate;
          const end = service.endDate;
          let dia = new Date(start);

          while (dia.getTime() !== end.getTime()) {
            notAvailableAt.push(new Date(dia));
            dia = new Date(dia.getTime() + 24 * 60 * 60 * 1000);
          }
        }

        unavailability.push({
          room: room.number,
          notAvailableAt,
        });
      }

      return {
        data: unavailability,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error:
          "Houve um problema ao encontrar a disponibilidade dos quartos. Tente novamente mais tarde.",
      };
    }
  }
}
