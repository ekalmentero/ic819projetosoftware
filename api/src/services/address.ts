import { BaseDatabase } from "../../prisma/BaseDatabase";
import { Address } from "@prisma/client";
import UserService from "./user";
export default class AddressService {
  // Busca todos
  static async findAll() {
    try {
      const adresses = await BaseDatabase.address.findMany({
        select: {
          id: true,
          code: true,
          street: true,
          number: true,
          neighborhood: true,
          city: true,
          state: true,
          complement: true,
          user: {
            select: {
              name: true,
              cpf: true,
            },
          },
        },
      });
      return {
        data: adresses,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao encontrar os endereços.",
      };
    }
  }

  // Busca pelo ID
  static async findById(id: number) {
    try {
      // Verifica se o id foi passado e se é numérico
      if (!id || typeof id != "number") {
        return {
          data: null,
          status: 400,
          error: "ID inválido ou inexistente.",
        };
      }

      // Busca o endereço no banco
      const address = await BaseDatabase.address.findUnique({
        where: { id },
        select: {
          id: true,
          code: true,
          street: true,
          number: true,
          neighborhood: true,
          city: true,
          state: true,
          complement: true,
          user: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      return {
        data: address,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao encontrar o endereços.",
      };
    }
  }

  // Cadastro do endereço
  static async createAddress(address: Address) {
    try {
      // verifica se todos os dados foram passados
      if (
        !address.code ||
        !address.street ||
        !address.number ||
        !address.neighborhood ||
        !address.city ||
        !address.state ||
        !address.complement ||
        !address.userId
      ) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      // Cria o endereço no banco
      const addressCreated = await BaseDatabase.address.create({
        data: address,
      });
      if (addressCreated.id) {
        return {
          data: addressCreated,
          status: 200,
          error: "",
        };
      }
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao cadastrar o endereço.",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao cadastrar o endereço.",
      };
    }
  }

  // Atualização do endereço
  static async updateAddress(id: number, address: Address, userId: number) {
    try {
      // verifica se algum dado foi passado
      if (
        !address.code &&
        !address.street &&
        !address.number &&
        !address.neighborhood &&
        !address.city &&
        !address.state &&
        !address.complement &&
        !address.userId
      ) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      const addressExists = await BaseDatabase.address.findFirst({
        where: { id },
      });
      if (!addressExists) {
        return {
          data: false,
          status: 404,
          error: "Endereço não existe.",
        };
      }

      if (addressExists.userId !== userId) {
        return {
          data: false,
          status: 401,
          error: "Você não tem permissão para atualizar este endereço.",
        };
      }
      

      // Atualiza o endereço no banco
      const addressUpdated = await BaseDatabase.address.update({
        where: {
          id
        },
        data: {
          number: address.number ? address.number : addressExists.number,
          code: address.code ? address.code : addressExists.code,
          street: address.street ? address.street : addressExists.street,
          neighborhood: address.neighborhood
            ? address.neighborhood
            : addressExists.neighborhood,
          city: address.city ? address.city : addressExists.city,
          state: address.state ? address.state : addressExists.state,
          complement: address.complement
            ? address.complement
            : addressExists.complement,
        },
      });
      if (addressUpdated.id) {
        return {
          data: addressUpdated,
          status: 200,
          error: "",
        };
      }
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao atualizar o endereço.",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao atualizar o endereço.",
      };
    }
  }
}
