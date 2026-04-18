import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ApiService } from './api.service';

export interface ChatMessage {
  id: number;
  text: string;
  isUser: boolean;
  time: string;
}

export interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'workout' | 'nutrition' | 'supplement' | 'tip';
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private api: ApiService) {}

  sendMessage(message: string): Observable<ChatMessage> {
    return this.api.post<ChatMessage>('/chat', { message });
  }

  getAIResponse(userMessage: string): Observable<{ response: string; recommendations?: AIRecommendation[] }> {
    return this.api.post('/chat/ai', { message: userMessage });
  }

  getQuickResponses(): string[] {
    return [
      'خطة تمرين للتنحيف',
      'نظام غذائي صحي',
      'مكملات غذائية',
      'تمارين البطن',
      'نصائح لنوم أفضل',
      'زيادة كتلة عضلية'
    ];
  }

  getInitialGreeting(): string {
    return 'مرحباً! أنا مساعدك الذكي في FitLife. كيف يمكنني مساعدتك اليوم؟';
  }

  generateSimpleResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('تنحيف') || msg.includes('weight loss') || msg.includes('تخسيس')) {
      return 'لخسارة الوزن، أنصح بـ:\n• cardio 3-4 مرات أسبوعياً\n• تقليل السعرات بـ 500 يومياً\n• البروتين عالي (2g لكل كجم وزن)\n• النوم الكافي 7-8 ساعات\n\nهل تريد خطة مفصلة؟';
    }
    
    if (msg.includes('عضل') || msg.includes('build') || msg.includes('كمال')) {
      return 'لبناء عضلات، أنصح بـ:\n• تمارين قوة 4-5 مرات أسبوعياً\n• بروتين عالي (1.6-2g لكل كجم)\n• الفائض السعراني 200-300 سعرة\n• راحة كافية بين التمارين\n\nهل تريد برنامجاً أسبوعياً؟';
    }
    
    if (msg.includes('غذاء') || msg.includes('diet') || msg.includes('تغذية')) {
      return 'أساسيات التغذية الصحية:\n• وجبات متوازنة (بروتين + كربوهيدرات + دهون)\n• الخضار والفواكه يومياً\n• تجنب السكريات المصنعة\n• شرب 2-3 لتر ماء\n• الوجبات صغيرة ومتكررة\n\nهل تريد نظاماً meal plan؟';
    }
    
    if (msg.includes('مكمل') || msg.includes('supplement')) {
      return 'المكملات الأساسية:\n• بروتين whey للتعافي\n• كرياتين لل kekuatan\n• multivitamin للثغرات الغذائية\n• أوميغا 3 لصحة القلب\n• vitamin D للعظام\n\nأخبرني عن هدفك لأوصي بالمكملات المناسبة';
    }
    
    if (msg.includes('تمرين') || msg.includes('exercise') || msg.includes('تمارين')) {
      return 'أنواع التمارين الأساسية:\n• cardio لتحسين القلب\n• تمارين قوة للعضلات\n• HIIT للدهون\n• تمارين مرونة\n• stretching للاستشفاء\n\nما هو هدفك الرياضي؟';
    }
    
    if (msg.includes('بطن') || msg.includes('abs') || msg.includes('six pack')) {
      return 'تمارين البطن:\n• Crunches 3x15\n• Plank 3x30s\n• Leg raises 3x12\n• Bicycle 3x15\n• Russian twists 3x20\n\nملاحظة: لا يوجد تمرين واحد لحرق دهون البطن - تحتاج نقص عام في الدهون';
    }
    
    if (msg.includes('نوم') || msg.includes('sleep')) {
      return 'نصائح لنوم أفضل:\n• موعد ثابت للنوم\n• غرفة مظلمة وباردة\n• تجنب الشاشات قبل النوم\n• لا تشرب كافيين بعد الظهر\n•exercise منتظم (ليس قبل النوم)\n•avoid وجبات ثقيلة ليلاً';
    }
    
    return 'شكراً لسؤالك! يمكنني مساعدتك في:\n• برامج تمارين مخصصة\n• أنظمة غذائية\n• مكملات غذائية\n• نصائح صحية عامة\n\nما الذي يهمك؟';
  }
}