import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
            <p class="text-sm text-text-secondary">متاح الآن</p>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4">
        <div class="max-w-3xl mx-auto space-y-4">
          @for (msg of messages; track msg.id) {
            <div [class]="msg.isUser ? 'flex justify-end' : 'flex justify-start'">
              <div [class]="msg.isUser 
                ? 'bg-primary text-white rounded-xl rounded-br-none px-4 py-3 max-w-xs lg:max-w-md' 
                : 'bg-white text-text-primary rounded-xl rounded-bl-none px-4 py-3 max-w-xs lg:max-w-md shadow-sm'">
                <p class="leading-relaxed">{{msg.text}}</p>
                <p [class]="msg.isUser ? 'text-white/70 text-xs mt-1' : 'text-text-secondary text-xs mt-1'">{{msg.time}}</p>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Quick Questions -->
      <div class="px-4 py-2 border-t border-border bg-surface">
        <div class="max-w-3xl mx-auto flex gap-2 overflow-x-auto pb-2">
          @for (q of quickQuestions; track q) {
            <button (click)="sendQuickQuestion(q)" 
                    class="whitespace-nowrap px-4 py-2 bg-background rounded-full text-sm hover:bg-primary/10 transition">
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
                 class="flex-1 input" />
          <button (click)="sendMessage()" class="btn-primary px-6">
            <span>إرسال</span>
            <span class="mr-2">➤</span>
          </button>
        </div>
      </div>
    </div>
  `
})
export class ChatComponent {
  messages: Message[] = [
    { id: 1, text: 'مرحباً! أنا مساعدك الذكي في FitLife. كيف يمكنني مساعدتك اليوم؟', isUser: false, time: '10:00' },
    { id: 2, text: 'أريد خطة تمرين للتنحيف', isUser: true, time: '10:01' },
    { id: 3, text: 'سأقوم بإعداد خطة تمرين مخصصة لك. أولاً، كم مرة في الأسبوع يمكنك ممارسة التمارين؟', isUser: false, time: '10:02' },
    { id: 4, text: '3 مرات في الأسبوع', isUser: true, 'time': '10:03' },
    { id: 5, text: 'ممتاز! إليك خطة تمارين للتنحيف:\n\n• اليوم 1: تمارين cardio + بطن\n• اليوم 2: راحة\n• اليوم 3: تمارين قوة كامل الجسم\n• اليوم 4: راحة\n• اليوم 5: HIIT + stretching\n• اليوم 6-7: راحة\n\nهل تريد تفاصيل أكثر؟', isUser: false, time: '10:04' },
  ];

  newMessage = '';
  
  quickQuestions = [
    'خطة تمرين للتنحيف',
    'نظام غذائي صحي',
    'مكملات غذائية',
    'تمارين البطن',
  ];

  sendMessage() {
    if (!this.newMessage.trim()) return;
    
    this.messages.push({
      id: this.messages.length + 1,
      text: this.newMessage,
      isUser: true,
      time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
    });
    
    this.newMessage = '';
    
    setTimeout(() => {
      this.messages.push({
        id: this.messages.length + 1,
        text: 'شكراً لرسالتك! أنا أعمل على الإجابة...',
        isUser: false,
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
      });
    }, 1000);
  }

  sendQuickQuestion(q: string) {
    this.newMessage = q;
    this.sendMessage();
  }
}