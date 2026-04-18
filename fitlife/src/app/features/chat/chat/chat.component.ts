import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../../core/services/chat.service';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-background flex flex-col">
      <!-- Header -->
      <div class="bg-surface shadow-sm p-4">
        <div class="max-w-3xl mx-auto flex items-center gap-4">
          <div class="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <span class="text-white text-xl">🤖</span>
          </div>
          <div>
            <h1 class="font-semibold">المساعد الذكي</h1>
            <p class="text-sm text-text-secondary">{{ aiTyping() ? 'يكتب...' : 'متاح الآن' }}</p>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4" #chatContainer>
        <div class="max-w-3xl mx-auto space-y-4">
          @for (msg of messages(); track msg.id) {
            <div [class]="msg.isUser ? 'flex justify-end' : 'flex justify-start'">
              <div [class]="msg.isUser 
                ? 'bg-primary text-white rounded-xl rounded-br-none px-4 py-3 max-w-xs lg:max-w-md' 
                : 'bg-white text-text-primary rounded-xl rounded-bl-none px-4 py-3 max-w-xs lg:max-w-md shadow-sm'">
                <p class="leading-relaxed whitespace-pre-line">{{msg.text}}</p>
                <p [class]="msg.isUser ? 'text-white/70 text-xs mt-1' : 'text-text-secondary text-xs mt-1'">{{msg.time}}</p>
              </div>
            </div>
          }
          @if (aiTyping()) {
            <div class="flex justify-start">
              <div class="bg-white text-text-primary rounded-xl rounded-bl-none px-4 py-3 shadow-sm">
                <div class="flex gap-1">
                  <span class="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
                  <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.1s"></span>
                  <span class="w-2 h-2 bg-primary rounded-full animate-bounce" style="animation-delay: 0.2s"></span>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Quick Questions -->
      <div class="px-4 py-2 border-t border-border bg-surface">
        <div class="max-w-3xl mx-auto flex gap-2 overflow-x-auto pb-2">
          @for (q of chatService.getQuickResponses(); track q) {
            <button (click)="sendQuickQuestion(q)" 
                    class="whitespace-nowrap px-4 py-2 bg-background rounded-full text-sm hover:bg-primary/10 transition cursor-pointer">
              {{q}}
            </button>
          }
        </div>
      </div>

      <!-- Input -->
      <div class="p-4 bg-surface border-t border-border">
        <div class="max-w-3xl mx-auto flex gap-2">
          <input type="text" [(ngModel)]="newMessage" (keyup.enter)="sendMessage()"
                 placeholder="اكتب رسالتك..." 
                 [disabled]="aiTyping()"
                 class="flex-1 input" />
          <button (click)="sendMessage()" [disabled]="aiTyping() || !newMessage.trim()" 
                  class="btn-primary px-6 disabled:opacity-50">
            <span>إرسال</span>
            <span class="mr-2">➤</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent implements OnInit {
  chatService = inject(ChatService);
  
  messages = signal<Message[]>([]);
  newMessage = '';
  aiTyping = signal(false);

  ngOnInit() {
    const greeting = this.chatService.getInitialGreeting();
    this.messages.set([{
      id: 1,
      text: greeting,
      isUser: false,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }]);
  }

  sendMessage() {
    if (!this.newMessage.trim() || this.aiTyping()) return;
    
    const userMessage = this.newMessage;
    
    this.messages.update(msgs => [...msgs, {
      id: Date.now(),
      text: userMessage,
      isUser: true,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    }]);
    
    this.newMessage = '';
    this.aiTyping.set(true);

    setTimeout(() => {
      const response = this.chatService.generateSimpleResponse(userMessage);
      
      this.messages.update(msgs => [...msgs, {
        id: Date.now() + 1,
        text: response,
        isUser: false,
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      }]);
      
      this.aiTyping.set(false);
    }, 1500);
  }

  sendQuickQuestion(q: string) {
    this.newMessage = q;
    this.sendMessage();
  }
}