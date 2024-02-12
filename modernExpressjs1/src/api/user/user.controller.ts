import { Controller } from '../../decorators/routes/routes.decorator';
import { Get } from '../../decorators/routes.handlers';
import UserService from './user.service';
import { Request } from 'express';

@Controller('/api/user')
export default class UserController {
  private userService;
  constructor() {
    this.userService = new UserService();
  }
  @Get({}, '', '')
  public async getUsers(req: Request, res: Response) {
    return this.userService.getUser(req, res);
  }
}
