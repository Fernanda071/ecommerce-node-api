
import { autenticarUsuarioUseCase, registrarUsuarioUseCase } from "@modules/usuario/application/use-cases";
import { RegistrarUsuarioExpressController } from "./registrar-usuario.express.controller";
import { AutenticarUsuarioExpressController } from "@modules/usuario/presentation/autenticar-usuario.express.controller";

const registrarUsuarioController = new RegistrarUsuarioExpressController(registrarUsuarioUseCase);
const autenticarUsuarioController = new AutenticarUsuarioExpressController(autenticarUsuarioUseCase);

export {
    registrarUsuarioController,
    autenticarUsuarioController
}