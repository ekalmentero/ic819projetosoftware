import { BaseDatabase } from "../../prisma/BaseDatabase";
import { Pet } from "@prisma/client";
export default class PetService {
  // Busca todos
  static async findAll() {
    try {
      const pets = await BaseDatabase.pet.findMany({
        select: {
          id: true,
          name: true,
          species: true,
          breed: true,
          gender: true,
          age: true,
          description: true,
          user: {
            select: {
              name: true,
              cpf: true,
            },
          },
        },
      });
      return {
        data: pets,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao encontrar os pets.",
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

      // Busca o pet no banco
      const pet = await BaseDatabase.pet.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          species: true,
          breed: true,
          gender: true,
          age: true,
          description: true,
          user: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      });
      return {
        data: pet,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao encontrar o pet.",
      };
    }
  }

  // Cadastro de pet
  static async createPet(pet: Pet) {
    try {
      // verifica se todos os dados foram passados
      if (
        !pet.name ||
        !pet.species ||
        !pet.breed ||
        !pet.gender ||
        !pet.age ||
        !pet.description ||
        !pet.userId
      ) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      // Cria o pet no banco
      const petCreated = await BaseDatabase.pet.create({ data: pet });
      if (petCreated.id) {
        return {
          data: petCreated,
          status: 200,
          error: "",
        };
      }
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao cadastrar o pet.",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao cadastrar o pet.",
      };
    }
  }

  // Cadastro de pet
  static async updatePet(id: number, pet: Pet, userId: number) {
    try {
      // verifica se algum dado foi passado
      if (
        !pet.name &&
        !pet.species &&
        !pet.breed &&
        !pet.gender &&
        !pet.age &&
        !pet.description &&
        !pet.userId
      ) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      const petExists = await BaseDatabase.pet.findFirst({
        where: {
          id,
        },
      });
      if (!petExists) {
        return {
          data: false,
          status: 404,
          error: "Pet não existe.",
        };
      }

      if (petExists.userId !== userId) {
        return {
          data: false,
          status: 401,
          error: "Você não tem permissão para atualizar este pet.",
        };
      }

      // Atualiza o pet no banco
      const petUpdated = await BaseDatabase.pet.update({
        where: {
          id,
        },
        data: {
          name: pet.name ? pet.name : petExists.name,
          breed: pet.breed ? pet.breed : petExists.breed,
          age: pet.age ? pet.age : petExists.age,
          description: pet.description
            ? pet.description
            : petExists.description,
        },
      });
      if (petUpdated.id) {
        return {
          data: petUpdated,
          status: 200,
          error: "",
        };
      }
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao atualizar o pet.",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao atualizar o pet.",
      };
    }
  }

  // Deleção de pet
  static async deletePet(id: number, userId: number) {
    try {
      // verifica se o id foi passado
      if (!id) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      // Verifica se o pet existe
      const petExists = await BaseDatabase.pet.findFirst({ where: { id } });

      if (!petExists) {
        return { data: null, status: 400, error: "Pet não cadastrado." };
      }

      if (petExists.userId !== userId) {
        return {
          data: false,
          status: 401,
          error: "Você não tem permissão para deletar este pet.",
        };
      }

      // Deleta o pet no banco
      const petDeleted = await BaseDatabase.pet.delete({
        where: { id },
      });
      if (petDeleted.id) {
        return {
          data: "Pet deletado com sucesso.",
          status: 200,
          error: "",
        };
      }
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao deletar o pet.",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao deletar o pet.",
      };
    }
  }
}
