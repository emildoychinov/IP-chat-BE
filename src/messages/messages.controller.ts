import {
  Controller,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Put,
  Body,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { AuthUser } from 'src/auth/auth.decorator';

export class UpdateMessageDto {
  msgId: string;
  newText: string;
}

@Controller('message')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:id')
  async deleteMessage(@Param(':id') id: string, @AuthUser() username: string) {
    this.messagesService.deleteMessage(id, username);
  }

  @HttpCode(HttpStatus.OK)
  @Put('update')
  async updateMessage(
    @Body() dto: UpdateMessageDto,
    @AuthUser() username: string,
  ) {
    this.messagesService.updateMessage(dto.msgId, dto.newText, username);
  }
}
