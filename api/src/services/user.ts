import { BaseDatabase } from "../../prisma/BaseDatabase";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default class UserService {
  private static secret = process.env.TOKEN_SECRET ?? "foo";

  static async getMe(id: number) {
    try {
      // Verifica se o id foi passado e se é numérico
      if (!id || typeof id != "number") {
        return {
          data: null,
          status: 400,
          error: "ID inválido ou inexistente.",
        };
      }

      // Busca o usuário no banco
      const user = await BaseDatabase.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          cpf: true,
          phone: true,
          email: true,
          pets: {
            select: {
              id: true,
              name: true,
              species: true,
              breed: true,
              age: true,
              description: true,
              gender: true,
            },
          },
          address: {
            select: {
              code: true,
              number: true,
              street: true,
              neighborhood: true,
              city: true,
              state: true,
              complement: true,
            },
          },
        },
      });
      return {
        data: user,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao encontrar o usuário.",
      };
    }
  }

  static async getMyPets(userId: number) {
    try {
      // Verifica se o id foi passado e se é numérico
      if (!userId || typeof userId != "number") {
        return {
          data: null,
          status: 400,
          error: "ID inválido ou inexistente.",
        };
      }

      // Busca o usuário no banco
      const pets = await BaseDatabase.pet.findMany({
        where: { userId },
        select: {
          id: true,
          name: true,
          breed: true,
          species: true,
          description: true,
          age: true,
          gender: true,
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
        error: "Houve um problema ao encontrar o usuário.",
      };
    }
  }

  static async isSignupComplete(userId: number) {
    try {
      const address = await this.getMyAddress(userId);
      if (address.data) {
        return {
          data: true,
          status: 200,
          error: "",
        };
      }
      return {
        data: false,
        status: 404,
        error: "",
      };
    } catch (error) {
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao buscar essa informação.",
      };
    }
  }

  static async getMyAddress(userId: number) {
    try {
      // Verifica se o id foi passado e se é numérico
      if (!userId || typeof userId != "number") {
        return {
          data: null,
          status: 400,
          error: "ID inválido ou inexistente.",
        };
      }

      // Busca o usuário no banco
      const user = await BaseDatabase.address.findUnique({
        where: { userId },
        select: {
          id: true,
          code: true,
          street: true,
          number: true,
          neighborhood: true,
          city: true,
          state: true,
          complement: true,
        },
      });
      return {
        data: user,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao encontrar o usuário.",
      };
    }
  }

  // Busca todos
  static async findAll() {
    try {
      const users = await BaseDatabase.user.findMany({
        select: {
          id: true,
          name: true,
          cpf: true,
          phone: true,
          email: true,
          admin: true,
        },
      });
      return {
        data: users,
        status: 200,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao encontrar os usuários.",
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

      // Busca o usuário no banco
      const user = await BaseDatabase.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          cpf: true,
          phone: true,
          email: true,
          admin: true,
        },
      });
      if (user) {
        return {
          data: user,
          status: 200,
          error: "",
        };
      }
      return {
        data: null,
        status: 404,
        error: "",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao encontrar o usuário.",
      };
    }
  }

  static async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT) || 10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  // Cadastro de usuário
  static async createUser(user: User) {
    try {
      // verifica se todos os dados foram passados
      if (
        !user.email ||
        !user.password ||
        !user.cpf ||
        !user.phone ||
        !user.name
      ) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      // Verifica se o usuário já existe
      const userExists = await BaseDatabase.user.findFirst({
        where: { OR: [{ email: user.email }, { cpf: user.cpf }] },
      });

      if (userExists) {
        return { data: null, status: 400, error: "Usuário já cadastrado." };
      }

      // Faz o hash da senha

      user.password = await this.hashPassword(user.password);

      if (!user.admin) {
        user.admin = false;
      } else {
        user.admin = true;
      }

      // Cria o usuário no banco
      const userCreated = await BaseDatabase.user.create({ data: user });
      if (userCreated.id) {
        return this.generateToken(
          userCreated.id,
          user.email,
          user.name,
          user.admin
        );
      }
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao cadastrar o usuário.",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao cadastrar o usuário.",
      };
    }
  }

  // Atualização de usuário
  static async updateUser(
    id: number,
    user: User,
    userId: number,
    admin: boolean
  ) {
    try {
      // verifica se algum dado foi passado
      if (!user.password && !user.phone && !user.name) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      // Verifica se o usuário existe
      const userExists = await BaseDatabase.user.findFirst({ where: { id } });

      if (!userExists) {
        return { data: null, status: 400, error: "Usuário não cadastrado." };
      }

      if (!admin && userExists.id !== userId) {
        return {
          data: false,
          status: 401,
          error: "Você não tem permissão para atualizar este usuário.",
        };
      }

      // Atualiza o usuário no banco
      const userUpdated = await BaseDatabase.user.update({
        where: {
          id,
        },
        data: {
          name: user.name ? user.name : userExists.name,
          phone: user.phone ? user.phone : userExists.phone,
          password: user.password
            ? await this.hashPassword(user.password)
            : userExists.password,
        },
      });
      if (userUpdated.id) {
        return this.generateToken(
          userUpdated.id,
          user.email,
          user.name,
          user.admin
        );
      }
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao atualizar o usuário.",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao atualizar o usuário.",
      };
    }
  }

  // Deleção de usuário
  static async deleteUser(id: number, userId: number, admin: boolean) {
    try {
      // verifica se o id foi passado
      if (!id) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      // Verifica se o usuário existe
      const userExists = await BaseDatabase.user.findFirst({ where: { id } });

      if (!userExists) {
        return { data: null, status: 400, error: "Usuário não cadastrado." };
      }

      if (!admin && userExists.id !== userId) {
        return {
          data: false,
          status: 401,
          error: "Você não tem permissão para deletar este usuário.",
        };
      }

      // Deleta o usuário no banco
      const userDeleted = await BaseDatabase.user.delete({
        where: {
          id,
        },
      });
      if (userDeleted.id) {
        return {
          data: "Usuário deletado com sucesso.",
          status: 200,
          error: "",
        };
      }
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao deletar o usuário.",
      };
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao deletar o usuário.",
      };
    }
  }

  // Login do usuário
  static async login(login: any) {
    try {
      // Verifica se o identificador (email ou cpf) e a senha foram passados
      const { identifier, password } = login;
      if (!identifier || !password) {
        return {
          data: null,
          status: 400,
          error: "Informações insuficientes.",
        };
      }

      // Verifica se o usuário já existe
      const userExists = await BaseDatabase.user.findFirst({
        where: { OR: [{ email: identifier }, { cpf: identifier }] },
      });
      if (!userExists) {
        return {
          data: null,
          status: 400,
          error: "Usuário não existe.",
        };
      }

      // Verifica se a senha está correta
      const validPassword = await bcrypt.compare(password, userExists.password);
      if (!validPassword) {
        return {
          data: null,
          status: 401,
          error: "Senha incorreta.",
        };
      }

      // Salva as informações dele no token
      return this.generateToken(
        userExists.id,
        userExists.email,
        userExists.name,
        userExists.admin
      );
    } catch (error) {
      console.log(error);
      return {
        data: null,
        status: 500,
        error: "Houve um problema ao autenticar o usuário.",
      };
    }
  }

  private static generateToken(
    id: number,
    email: string,
    name: string,
    admin: boolean
  ) {
    const token = jwt.sign({ id, email, name, admin }, UserService.secret, {
      expiresIn: "7d",
    });
    if (!token) {
      return {
        data: null,
        status: 401,
        error: "Não autorizado",
      };
    }
    return {
      data: {
        token,
        email,
        name,
        admin,
      },
      status: 200,
      error: "",
    };
  }
}
