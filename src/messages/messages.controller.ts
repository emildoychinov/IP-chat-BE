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
import { ApiTags } from '@nestjs/swagger';

export class UpdateMessageDto {
  msgId: string;
  newText: string;
}

@ApiTags('Messaging')
@Controller('message')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @HttpCode(HttpStatus.OK)
  @Delete('delete/:uuid')
  async deleteMessage(
    @Param(':uuid') id: string,
    @AuthUser() username: string,
  ) {
    this.messagesService.deleteMessage(id, username);
  }

  @HttpCode(HttpStatus.OK)
  @Put('edit')
  async updateMessage(
    @Body() dto: UpdateMessageDto,
    @AuthUser() username: string,
  ) {
    this.messagesService.updateMessage(dto.msgId, dto.newText, username);
  }
}
