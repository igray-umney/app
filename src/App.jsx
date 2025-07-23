import React, { useState, useEffect } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle');
  const [telegramUser, setTelegramUser] = useState(null);
  const [botConnected, setBotConnected] = useState(false);
  const [child, setChild] = useState({
    name: 'Андрей',
    age: 2,
    streak: 7
  });
  
  // Настройки уведомлений через Telegram Bot
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: false,
    time: '19:00',
    frequency: 'daily',
    reminderType: 'motivational',
    botUsername: 'razvivayка_bot', // Замените на имя вашего бота
    quietHours: {
      enabled: true,
      start: '21:00',
      end: '08:00'
    },
    weekendMode: false,
    customDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: true,
      sunday: false
    }
  });

  // Данные прогресса
  const [progressData] = useState({
    weeklyActivities: [true, true, false, true, true, false, false],
    totalActivities: 45,
    totalTime: 12.5,
    skillsProgress: {
      motor: 85,
      speech: 70,
      logic: 60,
      creativity: 90,
      development: 75
    },
    achievements: [
      { id: 1, title: 'Первая неделя', description: '7 дней подряд', icon: '🎯', unlocked: true },
      { id: 2, title: 'Творческий гений', description: '10 творческих активностей', icon: '🎨', unlocked: true },
      { id: 3, title: 'Исследователь', description: '15 логических игр', icon: '🔍', unlocked: false, progress: 12 },
      { id: 4, title: 'Месяц развития', description: '30 дней занятий', icon: '📅', unlocked: false, progress: 15 }
    ],
    recentActivities: [
      { name: 'Сортировка по цветам', category: 'Логика', date: '2025-01-13', duration: 20 },
      { name: 'Рисование пальчиками', category: 'Творчество', date: '2025-01-13', duration: 25 },
      { name: 'Простые пазлы', category: 'Логика', date: '2025-01-12', duration: 15 }
    ]
  });

  // База активностей
  const [activitiesDatabase] = useState({
    1: [
      {
        id: 1,
        title: 'Сенсорная коробка',
        description: 'Исследуем разные текстуры: песок, крупы, ткани',
        duration: '15 мин',
        category: 'Моторика',
        premium: false,
        icon: '🤲',
        difficulty: 'Легко',
        materials: ['Коробка', 'Рис/гречка', 'Ткани разной текстуры', 'Мелкие игрушки'],
        instructions: [
          'Возьмите небольшую коробку или контейнер',
          'Наполните её рисом, гречкой или другой крупой',
          'Добавьте кусочки разных тканей',
          'Спрячьте мелкие игрушки в наполнителе',
          'Пусть малыш исследует содержимое руками',
          'Показывайте и называйте найденные предметы'
        ],
        benefits: 'Развивает тактильные ощущения, мелкую моторику, концентрацию внимания',
        ageRange: '12-18 месяцев'
      },
      {
        id: 2,
        title: 'Игра с водой',
        description: 'Переливаем воду между емкостями, развиваем координацию',
        duration: '20 мин',
        category: 'Моторика',
        premium: false,
        icon: '💧',
        difficulty: 'Легко',
        materials: ['2-3 емкости разного размера', 'Вода', 'Губка', 'Полотенце'],
        instructions: [
          'Приготовьте емкости разного размера',
          'Налейте воду в одну из них',
          'Покажите малышу, как переливать воду',
          'Пусть ребенок экспериментирует самостоятельно',
          'Дайте губку - пусть выжимает воду',
          'Не забудьте про полотенце для уборки!'
        ],
        benefits: 'Развивает мелкую моторику, понимание причины и следствия, тактильные ощущения',
        ageRange: '10-24 месяца'
      },
      {
        id: 3,
        title: 'Музыкальные инструменты',
        description: 'Изучаем звуки: погремушки, барабан, колокольчики',
        duration: '10 мин',
        category: 'Творчество',
        premium: true,
        icon: '🎵',
        difficulty: 'Легко',
        materials: ['Погремушки', 'Колокольчики', 'Самодельный барабан', 'Ложки'],
        instructions: [
          'Подготовьте разные музыкальные инструменты',
          'Покажите, как извлекать звуки из каждого',
          'Пусть малыш попробует сам',
          'Играйте простые ритмы',
          'Пойте песенки под аккомпанемент',
          'Танцуйте под музыку'
        ],
        benefits: 'Развивает слух, чувство ритма, координацию движений, творческие способности',
        ageRange: '8-18 месяцев'
      }
    ],
    2: [
      {
        id: 4,
        title: 'Собираем пирамидку',
        description: 'Развиваем мелкую моторику и понимание размеров',
        duration: '15 мин',
        category: 'Логика',
        premium: false,
        icon: '📐',
        difficulty: 'Легко',
        materials: ['Пирамидка с кольцами разного размера'],
        instructions: [
          'Покажите ребенку пирамидку',
          'Разберите её на части',
          'Объясните понятия "большой" и "маленький"',
          'Пусть ребенок попробует собрать сам',
          'Помогайте при необходимости',
          'Хвалите за каждое правильное действие'
        ],
        benefits: 'Развивает мелкую моторику, понимание размеров, логическое мышление, терпение',
        ageRange: '18-30 месяцев'
      },
      {
        id: 5,
        title: 'Рисование пальчиками',
        description: 'Творческое развитие с безопасными красками',
        duration: '25 мин',
        category: 'Творчество',
        premium: false,
        icon: '🎨',
        difficulty: 'Средне',
        materials: ['Пальчиковые краски', 'Большой лист бумаги', 'Влажные салфетки'],
        instructions: [
          'Подготовьте рабочее место',
          'Наденьте на ребенка старую одежду',
          'Покажите, как макать палец в краску',
          'Начните с простых отпечатков',
          'Рисуйте вместе простые фигуры',
          'Не ограничивайте творчество ребенка'
        ],
        benefits: 'Развивает творческие способности, мелкую моторику, цветовосприятие, тактильные ощущения',
        ageRange: '18-36 месяцев'
      },
      {
        id: 6,
        title: 'Лепка из пластилина',
        description: 'Развиваем креативность и мелкую моторику',
        duration: '30 мин',
        category: 'Творчество',
        premium: true,
        icon: '🎭',
        difficulty: 'Средне',
        materials: ['Мягкий пластилин', 'Доска для лепки', 'Простые формочки'],
        instructions: [
          'Разогрейте пластилин в руках',
          'Покажите основные приемы: катание, сплющивание',
          'Лепите простые фигуры: шарики, колбаски',
          'Используйте формочки для создания фигур',
          'Создавайте простых животных',
          'Не стремитесь к идеальному результату'
        ],
        benefits: 'Развивает мелкую моторику, творческие способности, пространственное мышление, усидчивость',
        ageRange: '24-36 месяцев'
      }
    ],
    3: [
      {
        id: 7,
        title: 'Сортировка по цветам',
        description: 'Изучаем основные цвета и их названия',
        duration: '20 мин',
        category: 'Логика',
        premium: false,
        icon: '🌈',
        difficulty: 'Легко',
        materials: ['Цветные предметы', '4-5 коробочек или емкостей'],
        instructions: [
          'Подготовьте предметы 4-5 основных цветов',
          'Покажите ребенку, как сортировать по цветам',
          'Называйте каждый цвет при сортировке',
          'Пусть ребенок повторяет названия цветов',
          'Проверьте результат вместе',
          'Усложните задачу, добавив больше цветов'
        ],
        benefits: 'Развивает цветовосприятие, логическое мышление, внимание, словарный запас',
        ageRange: '2-4 года'
      },
      {
        id: 8,
        title: 'Простые пазлы',
        description: 'Пазлы из 4-6 элементов, развиваем логику',
        duration: '25 мин',
        category: 'Логика',
        premium: false,
        icon: '🧩',
        difficulty: 'Средне',
        materials: ['Пазлы из 4-6 крупных элементов', 'Картинки для образца'],
        instructions: [
          'Выберите пазл с крупными деталями',
          'Покажите готовую картинку',
          'Разберите пазл на части',
          'Помогите найти угловые детали',
          'Собирайте постепенно, хваля за успехи',
          'Постепенно увеличивайте количество деталей'
        ],
        benefits: 'Развивает логическое мышление, пространственное восприятие, терпение, мелкую моторику',
        ageRange: '2,5-4 года'
      },
      {
        id: 9,
        title: 'Ролевые игры',
        description: 'Играем в доктора, повара, водителя',
        duration: '30 мин',
        category: 'Развитие',
        premium: true,
        icon: '👨‍⚕️',
        difficulty: 'Средне',
        materials: ['Игрушечные инструменты', 'Костюмы или атрибуты', 'Куклы/игрушки'],
        instructions: [
          'Выберите роль для игры (доктор, повар, и т.д.)',
          'Подготовьте необходимые атрибуты',
          'Покажите, как играть эту роль',
          'Пусть ребенок попробует сам',
          'Меняйтесь ролями',
          'Придумывайте разные сценарии'
        ],
        benefits: 'Развивает социальные навыки, воображение, речь, эмпатию, понимание профессий',
        ageRange: '2,5-5 лет'
      }
    ]
  });

  // База мотивирующих сообщений
  const [motivationalMessages] = useState({
    daily: [
      '🌟 Время для развития с {name}! Сегодня изучаем что-то новое?',
      '💫 {name} ждет интересную активность! Что выберем сегодня?',
      '🎯 Продолжаем streak! Уже {streak} дней развиваемся вместе!',
      '🚀 Пора заниматься с {name}! Каждый день - новое открытие!',
      '⭐ {name} готов(а) к новым знаниям! Начинаем?'
    ],
    streak: [
      '🔥 Невероятно! {streak} дней подряд! {name} настоящий чемпион!',
      '👑 Потрясающий streak - {streak} дней! Продолжаем развиваться!',
      '🏆 {streak} дней занятий! {name} становится умнее каждый день!'
    ],
    encouragement: [
      '💪 Даже 10 минут занятий принесут пользу {name}!',
      '🌱 Каждая активность помогает {name} расти и развиваться!',
      '❤️ {name} любит проводить время с вами за играми!'
    ]
  });

  // История уведомлений
  const [notificationHistory, setNotificationHistory] = useState([
    {
      id: 1,
      message: 'Время для развития с Андрей! Сегодня изучаем что-то новое?',
      timestamp: '2025-01-14 19:00',
      type: 'daily',
      opened: true
    },
    {
      id: 2,
      message: 'Невероятно! 7 дней подряд! Андрей настоящий чемпион!',
      timestamp: '2025-01-13 19:00',
      type: 'streak',
      opened: true
    }
  ]);

  // Функция для проверки статуса уведомлений
  const checkNotificationStatus = async () => {
    if (telegramUser?.id) {
      try {
        console.log('🔍 Проверяем статус уведомлений для:', telegramUser.id);
        
        const response = await fetch(`https://telegram-bot-server-production-8dfb.up.railway.app/api/telegram/status/${telegramUser.id}`);
        
        if (response.ok) {
          const status = await response.json();
          console.log('📊 Статус с сервера:', status);
          
          if (status.connected) {
            console.log('✅ Уведомления уже настроены');
            setBotConnected(true);
            setNotificationSettings(prev => ({
              ...prev,
              enabled: status.enabled,
              time: status.time || prev.time,
              reminderType: status.type || prev.reminderType
            }));
          } else {
            console.log('❌ Уведомления не настроены');
            setBotConnected(false);
          }
        } else {
          console.log('⚠️ Ошибка ответа сервера:', response.status);
          setBotConnected(false);
        }
      } catch (error) {
        console.error('❌ Ошибка проверки статуса:', error);
        setBotConnected(false);
      }
    }
  };

  // Telegram Mini App integration
  useEffect(() => {
    // Инициализация Telegram Web App
    if (window.Telegram && window.Telegram.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      
      // Получаем данные пользователя
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setTelegramUser(user);
        // Автоматически устанавливаем имя ребенка на основе имени пользователя
        setChild(prev => ({
          ...prev,
          name: user.first_name || 'Малыш'
        }));
      }

      // Настраиваем внешний вид
      tg.setHeaderColor('#ffffff');
      tg.setBackgroundColor('#f8fafc');
      
      // Обработчик кнопки "Назад"
      tg.onEvent('backButtonClicked', () => {
        if (currentScreen !== 'main') {
          setCurrentScreen('main');
          setSelectedActivity(null);
        }
      });

      // Показываем/скрываем кнопку "Назад"
      if (currentScreen !== 'main') {
        tg.BackButton.show();
      } else {
        tg.BackButton.hide();
      }
    }
  }, [currentScreen]);

  // Проверяем статус уведомлений после получения данных пользователя
  useEffect(() => {
    if (telegramUser) {
      const timer = setTimeout(() => {
        checkNotificationStatus();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [telegramUser]);
  
  // Функции для работы с Telegram Bot
  const connectToBot = async () => {
    try {
      console.log('🔗 Подключение к боту, telegramUser:', telegramUser);
      
      const response = await fetch('https://telegram-bot-server-production-8dfb.up.railway.app/api/telegram/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUser?.id,
          username: telegramUser?.username,
          settings: notificationSettings
        })
      });

      const result = await response.json();
      console.log('📡 Ответ сервера:', result);

      if (response.ok && result.success) {
        setBotConnected(true);
        setNotificationSettings(prev => ({ ...prev, enabled: true }));
        
        // Показываем соответствующее сообщение
        let message = 'Уведомления подключены!';
        if (result.needsBotStart) {
          message += '\n\nДля получения уведомлений напишите боту /start';
        }
        
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert(message);
        } else {
          alert(message);
        }
      } else {
        throw new Error(result.message || 'Ошибка подключения');
      }
    } catch (error) {
      console.error('❌ Ошибка подключения к боту:', error);
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Ошибка подключения к боту: ' + error.message);
      } else {
        alert('Ошибка подключения к боту: ' + error.message);
      }
    }
  };

  const sendTestNotification = async () => {
    if (!botConnected) {
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.showAlert('Сначала подключитесь к боту!');
      }
      return;
    }

    try {
      const message = getRandomMessage(notificationSettings.reminderType);
      
      const response = await fetch('https://telegram-bot-server-production-8dfb.up.railway.app/api/telegram/send-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUser?.id,
          message: message
        })
      });

      if (response.ok) {
        // Добавляем в историю
        const newNotification = {
          id: Date.now(),
          message: message,
          timestamp: new Date().toISOString(),
          type: notificationSettings.reminderType,
          opened: false
        };
        
        setNotificationHistory(prev => [newNotification, ...prev]);
        
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.showAlert('Тестовое уведомление отправлено!');
        }
      }
    } catch (error) {
      console.error('Ошибка отправки уведомления:', error);
    }
  };

  // Функция для создания платежа через Telegram Payments
  const createTelegramPayment = async () => {
    if (!window.Telegram?.WebApp) {
      alert('Эта функция доступна только в Telegram');
      return;
    }

    setPaymentStatus('processing');
    
    try {
      // Создаем инвойс через Telegram Bot API
      const response = await fetch('https://telegram-bot-server-production-8dfb.up.railway.app/api/telegram/create-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUser?.id,
          amount: 299,
          description: 'Премиум подписка Развивайка',
          payload: `premium_${Date.now()}`
        })
      });

      if (response.ok) {
        const { invoiceUrl } = await response.json();
        
        // Открываем инвойс в Telegram
        window.Telegram.WebApp.openInvoice(invoiceUrl, (status) => {
          if (status === 'paid') {
            setPaymentStatus('success');
            setIsPremium(true);
            setTimeout(() => {
              setShowPayment(false);
              setPaymentStatus('idle');
            }, 2000);
          } else {
            setPaymentStatus('error');
          }
        });
      }
    } catch (error) {
      console.error('Ошибка при создании платежа:', error);
      setPaymentStatus('error');
    }
  };

  // Альтернативный способ оплаты через Telegram Stars
  const createStarsPayment = async () => {
    if (!window.Telegram?.WebApp) {
      alert('Эта функция доступна только в Telegram');
      return;
    }

    setPaymentStatus('processing');
    
    try {
      // Оплата через Telegram Stars
      const response = await fetch('/api/telegram/create-stars-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUser?.id,
          stars: 50, // Количество звезд
          description: 'Премиум подписка Развивайка',
          payload: `premium_stars_${Date.now()}`
        })
      });

      if (response.ok) {
        const { invoiceUrl } = await response.json();
        
        window.Telegram.WebApp.openInvoice(invoiceUrl, (status) => {
          if (status === 'paid') {
            setPaymentStatus('success');
            setIsPremium(true);
            setTimeout(() => {
              setShowPayment(false);
              setPaymentStatus('idle');
            }, 2000);
          } else {
            setPaymentStatus('error');
          }
        });
      }
    } catch (error) {
      console.error('Ошибка при создании платежа:', error);
      setPaymentStatus('error');
    }
  };

  // Симуляция успешного платежа
  const simulatePaymentSuccess = () => {
    setPaymentStatus('success');
    setIsPremium(true);
    setTimeout(() => {
      setShowPayment(false);
      setPaymentStatus('idle');
    }, 2000);
  };

  // Утилиты
  const getAgeText = (age) => {
    if (age === 1) return 'год';
    if (age < 5) return 'года';
    return 'лет';
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Моторика': 'bg-blue-100 text-blue-800',
      'Речь': 'bg-green-100 text-green-800',
      'Логика': 'bg-purple-100 text-purple-800',
      'Творчество': 'bg-pink-100 text-pink-800',
      'Развитие': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'Легко': 'bg-green-100 text-green-800',
      'Средне': 'bg-yellow-100 text-yellow-800',
      'Сложно': 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const getNotificationTypeColor = (type) => {
    const colors = {
      'daily': 'bg-blue-100 text-blue-800',
      'streak': 'bg-orange-100 text-orange-800',
      'encouragement': 'bg-green-100 text-green-800',
      'reminder': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const getFilteredActivities = () => {
    const activities = activitiesDatabase[child.age] || [];
    if (selectedCategory === 'all') {
      return activities;
    }
    return activities.filter(activity => activity.category === selectedCategory);
  };

  const getActivityCategories = () => {
    const activities = activitiesDatabase[child.age] || [];
    const categories = [...new Set(activities.map(activity => activity.category))];
    return categories.map(cat => ({
      id: cat,
      name: cat,
      count: activities.filter(a => a.category === cat).length
    }));
  };

  const getRandomMessage = (type) => {
    const messages = motivationalMessages[type] || motivationalMessages.daily;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return randomMessage
      .replace('{name}', child.name)
      .replace('{streak}', child.streak);
  };

  // Модальное окно оплаты для Telegram
  const PaymentModal = () => {
    if (!showPayment) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full">
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">👑</span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Премиум подписка</h2>
            <p className="text-gray-600 mb-6">Разблокируйте все возможности приложения</p>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Что входит в премиум:</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Все активности без ограничений
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Персональные программы развития
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Подробная аналитика прогресса
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Эксклюзивные материалы
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  Приоритетная поддержка
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Стоимость:</span>
                <span className="text-2xl font-bold text-purple-600">299₽/мес</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">или 50 ⭐ Telegram Stars</p>
            </div>
            
            {paymentStatus === 'processing' && (
              <div className="mb-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
                <p className="text-sm text-gray-600 mt-2">Обработка платежа...</p>
              </div>
            )}
            
            {paymentStatus === 'success' && (
              <div className="mb-4 p-4 bg-green-50 rounded-lg">
                <div className="text-green-500 text-2xl mb-2">✓</div>
                <p className="text-green-800 font-semibold">Платеж успешно завершен!</p>
                <p className="text-sm text-green-600">Премиум активирован</p>
              </div>
            )}
            
            {paymentStatus === 'error' && (
              <div className="mb-4 p-4 bg-red-50 rounded-lg">
                <div className="text-red-500 text-2xl mb-2">✗</div>
                <p className="text-red-800 font-semibold">Ошибка платежа</p>
                <p className="text-sm text-red-600">Попробуйте еще раз</p>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={createTelegramPayment}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="mr-2">💳</span>
                {paymentStatus === 'processing' ? 'Обработка...' : 'Оплатить картой'}
              </button>
              
              <button
                onClick={createStarsPayment}
                disabled={paymentStatus === 'processing'}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-3 rounded-lg font-medium hover:from-yellow-600 hover:to-yellow-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <span className="mr-2">⭐</span>
                {paymentStatus === 'processing' ? 'Обработка...' : 'Оплатить Stars'}
              </button>
              
              <button
                onClick={simulatePaymentSuccess}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors"
              >
                Симулировать успешный платеж (для теста)
              </button>
              
              <button
                onClick={() => setShowPayment(false)}
                className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-400 transition-colors"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Главный экран с интеграцией Telegram
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white shadow-sm px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Привет, {child.name}! 👋</h1>
              <p className="text-gray-600">Возраст: {child.age} {getAgeText(child.age)}</p>
              {telegramUser && (
                <p className="text-xs text-gray-500 mt-1">
                  Telegram: @{telegramUser.username || telegramUser.first_name}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center bg-orange-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-orange-800">🏆 {child.streak} дней</span>
              </div>
              <button 
                onClick={() => setCurrentScreen('notifications')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors relative"
              >
                <span className="text-xl">🔔</span>
                {botConnected && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                )}
              </button>
              <button 
                onClick={() => setCurrentScreen('settings')}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                ⚙️
              </button>
            </div>
          </div>
        </div>

        {/* Telegram Bot Connection */}
        {!botConnected && (
          <div className="mx-4 mt-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold flex items-center">🤖 Подключить уведомления</h3>
                <p className="text-sm opacity-90">Бот будет напоминать о занятиях в Telegram</p>
              </div>
              <button 
                onClick={connectToBot}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors"
              >
                Подключить
              </button>
            </div>
          </div>
        )}

        {/* Notification Status */}
        {botConnected && (
          <div className="mx-4 mt-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold flex items-center">✅ Уведомления активны</h3>
                <p className="text-sm opacity-90">Следующее напоминание в {notificationSettings.time}</p>
              </div>
              <button 
                onClick={() => setCurrentScreen('notifications')}
                className="bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg font-medium hover:bg-opacity-30 transition-colors"
              >
                Настроить
              </button>
            </div>
          </div>
        )}

        {!isPremium && (
          <div className="mx-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold flex items-center">👑 Премиум подписка</h3>
                <p className="text-sm opacity-90">Открой все активности и возможности</p>
              </div>
              <button 
                onClick={() => setShowPayment(true)}
                className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Подключить
              </button>
            </div>
          </div>
        )}

        <div className="px-4 py-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="text-center mb-6">
              <div className="bg-gradient-to-r from-green-400 to-blue-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-3xl">▶️</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Время для развития!</h2>
              <p className="text-gray-600">Выбери активность для {child.name}</p>
            </div>
            
            <button 
              onClick={() => setCurrentScreen('activities')}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-medium text-lg hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105"
            >
              Начать активность
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{(activitiesDatabase[child.age] || []).length}</p>
                  <p className="text-sm text-gray-600">Активности</p>
                </div>
                <span className="text-2xl">🎯</span>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-purple-600">{progressData.totalTime}ч</p>
                  <p className="text-sm text-gray-600">Время развития</p>
                </div>
                <span className="text-2xl">⏰</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setCurrentScreen('progress')}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">📅</span>
              </div>
              <p className="text-sm font-medium text-gray-800">Прогресс</p>
            </button>
            <button 
              onClick={() => setCurrentScreen('library')}
              className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-center mb-2">
                <span className="text-2xl">📚</span>
              </div>
              <p className="text-sm font-medium text-gray-800">Библиотека</p>
            </button>
          </div>
        </div>

        {/* Age Selector for testing */}
        <div className="px-4 pb-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Тест возрастов:</p>
            <div className="flex gap-2 flex-wrap">
              {[1,2,3,4,5,6,7].map(age => (
                <button 
                  key={age}
                  onClick={() => setChild({...child, age})}
                  className={`px-3 py-1 rounded text-sm ${
                    child.age === age ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
                  }`}
                >
                  {age} {getAgeText(age)}
                </button>
              ))}
            </div>
          </div>
        </div>

        <PaymentModal />
      </div>
    );
  }

  // Экран настроек уведомлений через Telegram Bot
  if (currentScreen === 'notifications') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Уведомления</h1>
              <p className="text-sm text-gray-600">Настройка напоминаний через Telegram</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          {/* Bot Connection Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-gray-800">Telegram Bot</h2>
                <p className="text-sm text-gray-600">@{notificationSettings.botUsername}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                botConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {botConnected ? 'Подключен' : 'Не подключен'}
              </div>
            </div>

            {!botConnected ? (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Как подключить уведомления:</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Найдите бота @{notificationSettings.botUsername} в Telegram</li>
                    <li>2. Нажмите /start</li>
                    <li>3. Вернитесь в приложение и нажмите "Подключить"</li>
                  </ol>
                </div>
                
                <button
                  onClick={connectToBot}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Подключить бота
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">✅ Бот успешно подключен!</h3>
                  <p className="text-sm text-green-800">
                    Теперь вы будете получать напоминания о занятиях прямо в Telegram
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Время напоминания
                  </label>
                  <input 
                    type="time" 
                    value={notificationSettings.time}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings, 
                      time: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Частота напоминаний
                  </label>
                  <select 
                    value={notificationSettings.frequency}
                    onChange={(e) => setNotificationSettings({
                      ...notificationSettings, 
                      frequency: e.target.value
                    })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="daily">Ежедневно</option>
                    <option value="weekly">Еженедельно</option>
                    <option value="custom">Выбрать дни</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Notification Type */}
          {botConnected && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Тип сообщений</h2>
              <div className="space-y-3">
                {[
                  { 
                    value: 'motivational', 
                    label: 'Мотивирующие', 
                    description: 'Вдохновляющие сообщения для занятий',
                    example: getRandomMessage('daily')
                  },
                  { 
                    value: 'simple', 
                    label: 'Простые', 
                    description: 'Краткие напоминания о времени занятий',
                    example: `Время для занятий с ${child.name}!`
                  },
                  { 
                    value: 'streak', 
                    label: 'С streak', 
                    description: 'Акцент на достижениях и регулярности',
                    example: getRandomMessage('streak')
                  }
                ].map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setNotificationSettings({
                      ...notificationSettings,
                      reminderType: type.value
                    })}
                    className={`w-full p-4 rounded-lg border-2 transition-colors text-left ${
                      notificationSettings.reminderType === type.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">{type.label}</h3>
                      {notificationSettings.reminderType === type.value && (
                        <span className="text-blue-500">✓</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                    <p className="text-xs text-gray-500 italic">"{type.example}"</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Test Notification */}
          {botConnected && (
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Тестовое уведомление</h2>
              <p className="text-sm text-gray-600 mb-4">
                Отправьте тестовое сообщение в Telegram
              </p>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-blue-500 mr-2">🤖</span>
                  <span className="font-semibold text-blue-900">Развивайка Бот</span>
                  <span className="text-xs text-blue-600 ml-auto">{notificationSettings.time}</span>
                </div>
                <p className="text-blue-800">
                  {getRandomMessage(notificationSettings.reminderType)}
                </p>
              </div>

              <button 
                onClick={sendTestNotification}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Отправить тестовое уведомление
              </button>
            </div>
          )}

          {/* Notification History */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">История уведомлений</h2>
            <div className="space-y-3">
              {notificationHistory.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg ${
                    notification.opened ? 'bg-gray-50' : 'bg-blue-50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getNotificationTypeColor(notification.type)}`}>
                      {notification.type === 'daily' ? 'Ежедневное' : 
                       notification.type === 'streak' ? 'Streak' : 'Другое'}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(notification.timestamp).toLocaleString('ru-RU')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{notification.message}</p>
                  {!notification.opened && (
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

// Экран активностей
  if (currentScreen === 'activities') {
    const categories = getActivityCategories();
    const filteredActivities = getFilteredActivities();
    const freeActivities = filteredActivities.filter(a => !a.premium);
    const premiumActivities = filteredActivities.filter(a => a.premium);

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => {
                setSelectedActivity(null);
                setCurrentScreen('main');
              }}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Активности</h1>
              <p className="text-sm text-gray-600">{child.age} {getAgeText(child.age)} • {filteredActivities.length} активностей</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          {/* Categories Filter */}
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Категории</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === 'all'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Все ({(activitiesDatabase[child.age] || []).length})
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>

          {/* Free Activities */}
          {freeActivities.length > 0 && (
            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-green-500 mr-2">🆓</span>
                Бесплатные активности ({freeActivities.length})
              </h2>
              <div className="space-y-3">
                {freeActivities.map((activity) => (
                  <div key={activity.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{activity.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">{activity.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                {activity.category}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                                {activity.difficulty}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                ⏱️ {activity.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-11 mb-2">{activity.description}</p>
                        <p className="text-xs text-gray-500 ml-11">Возраст: {activity.ageRange}</p>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <button 
                          onClick={() => setSelectedActivity(activity)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm"
                        >
                          Подробнее
                        </button>
                        <button 
                          onClick={() => {
                            if (window.Telegram?.WebApp) {
                              window.Telegram.WebApp.showAlert(`Активность "${activity.title}" начата! 🎯`);
                            } else {
                              alert(`Активность "${activity.title}" начата! 🎯`);
                            }
                          }}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm"
                        >
                          Начать
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Premium Activities */}
          {premiumActivities.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="text-yellow-500 mr-2">👑</span>
                Премиум активности ({premiumActivities.length})
              </h2>
              <div className="space-y-3">
                {premiumActivities.map((activity) => (
                  <div key={activity.id} className={`bg-white rounded-xl p-4 shadow-sm ${!isPremium ? 'opacity-75' : 'hover:shadow-md transition-shadow'}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span className="text-2xl mr-3">{activity.icon}</span>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 flex items-center">
                              {activity.title}
                              {!isPremium && <span className="ml-2 text-gray-400">🔒</span>}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                                {activity.category}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(activity.difficulty)}`}>
                                {activity.difficulty}
                              </span>
                              <span className="text-xs text-gray-500 flex items-center">
                                ⏱️ {activity.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 ml-11 mb-2">{activity.description}</p>
                        <p className="text-xs text-gray-500 ml-11">Возраст: {activity.ageRange}</p>
                      </div>
                      <div className="ml-4 flex flex-col gap-2">
                        <button 
                          onClick={() => {
                            if (isPremium) {
                              setSelectedActivity(activity);
                            } else {
                              setShowPayment(true);
                            }
                          }}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                            isPremium 
                              ? 'bg-blue-500 text-white hover:bg-blue-600' 
                              : 'bg-gray-300 text-gray-500'
                          }`}
                        >
                          {isPremium ? 'Подробнее' : 'Премиум'}
                        </button>
                        <button 
                          onClick={() => {
                            if (isPremium) {
                              if (window.Telegram?.WebApp) {
                                window.Telegram.WebApp.showAlert(`Премиум активность "${activity.title}" начата! ✨`);
                              } else {
                                alert(`Премиум активность "${activity.title}" начата! ✨`);
                              }
                            } else {
                              setShowPayment(true);
                            }
                          }}
                          className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                            isPremium 
                              ? 'bg-purple-500 text-white hover:bg-purple-600' 
                              : 'bg-gray-300 text-gray-500'
                          }`}
                        >
                          {isPremium ? 'Начать' : 'Премиум'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Upgrade prompt for non-premium users */}
          {!isPremium && premiumActivities.length > 0 && (
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
              <h3 className="text-lg font-bold mb-2">🚀 Разблокируй все активности!</h3>
              <p className="text-sm opacity-90 mb-4">
                Получи доступ к {premiumActivities.length} премиум активностям с детальными инструкциями и материалами
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-3 mb-4">
                <div className="text-sm space-y-1">
                  <p>✨ Эксклюзивные развивающие игры</p>
                  <p>📚 Подробные инструкции от экспертов</p>
                  <p>🎯 Персональные программы развития</p>
                  <p>📊 Детальная аналитика прогресса</p>
                </div>
              </div>
              <button 
                onClick={() => setShowPayment(true)}
                className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Подключить премиум - 299₽/мес
              </button>
            </div>
          )}

          {/* No activities message */}
          {filteredActivities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Активности не найдены</h3>
              <p className="text-gray-600 mb-6">
                Для возраста {child.age} {getAgeText(child.age)} в категории "{selectedCategory}" активностей нет
              </p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Показать все активности
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Детальный экран активности
  if (selectedActivity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setSelectedActivity(null)}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div className="flex items-center">
              <span className="text-2xl mr-3">{selectedActivity.icon}</span>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{selectedActivity.title}</h1>
                <p className="text-sm text-gray-600">{selectedActivity.ageRange} • {selectedActivity.duration}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          {/* Activity Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(selectedActivity.category)}`}>
                {selectedActivity.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedActivity.difficulty)}`}>
                {selectedActivity.difficulty}
              </span>
              {selectedActivity.premium && (
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full font-medium">
                  👑 Премиум
                </span>
              )}
            </div>
            
            <p className="text-gray-700 mb-4">{selectedActivity.description}</p>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">🎯 Польза для развития:</h3>
              <p className="text-blue-800 text-sm">{selectedActivity.benefits}</p>
            </div>
          </div>

          {/* Materials */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📦 Что понадобится:</h3>
            <div className="grid grid-cols-1 gap-2">
              {selectedActivity.materials.map((material, index) => (
                <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-green-500 mr-3">✓</span>
                  <span className="text-gray-700">{material}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Пошаговая инструкция:</h3>
            <div className="space-y-3">
              {selectedActivity.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
                  <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-gray-700">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={() => {
                if (window.Telegram?.WebApp) {
                  window.Telegram.WebApp.showAlert(`🚀 Активность "${selectedActivity.title}" начата!\n\nУдачных занятий с ${child.name}! 💪`);
                } else {
                  alert(`🚀 Активность "${selectedActivity.title}" начата!\n\nУдачных занятий с ${child.name}! 💪`);
                }
              }}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-medium text-lg hover:from-green-600 hover:to-blue-600 transition-all"
            >
              🚀 Начать активность
            </button>
            
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.showAlert(`⏰ Таймер на ${selectedActivity.duration} установлен!`);
                  } else {
                    alert(`⏰ Таймер на ${selectedActivity.duration} установлен!`);
                  }
                }}
                className="bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                ⏰ Установить таймер
              </button>
              <button 
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.showAlert('📸 Результат сохранен в галерею!');
                  } else {
                    alert('📸 Результат сохранен в галерею!');
                  }
                }}
                className="bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                📸 Сохранить результат
              </button>
            </div>
            
            <button 
              onClick={() => {
                if (botConnected) {
                  sendTestNotification();
                } else {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.showAlert('Подключите Telegram бота для отправки напоминаний!');
                  } else {
                    alert('Подключите Telegram бота для отправки напоминаний!');
                  }
                }
              }}
              className="w-full bg-purple-500 text-white py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
            >
              🔔 Напомнить завтра
            </button>
          </div>
        </div>
      </div>
    );
  }
  
// Экран настроек профиля
  if (currentScreen === 'settings') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentScreen('main')}
              className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <span className="text-2xl">←</span>
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Настройки</h1>
              <p className="text-sm text-gray-600">Управление профилем и подпиской</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-6">
          {/* Child Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Информация о ребенке</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Имя</label>
                <input 
                  type="text" 
                  value={child.name}
                  onChange={(e) => setChild({...child, name: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Введите имя ребенка"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Возраст</label>
                <select 
                  value={child.age}
                  onChange={(e) => setChild({...child, age: parseInt(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1,2,3,4,5,6,7].map(age => (
                    <option key={age} value={age}>{age} {getAgeText(age)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Telegram Integration Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Telegram Интеграция</h2>
            
            {/* User Info */}
            {telegramUser && (
              <div className="bg-blue-50 rounded-lg p-4 mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-lg">👤</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-blue-900">{telegramUser.first_name}</h3>
                    <p className="text-sm text-blue-700">
                      @{telegramUser.username || 'пользователь'} • ID: {telegramUser.id}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Bot Connection Status */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🤖</span>
                <div>
                  <h3 className="font-medium text-gray-800">Telegram Бот</h3>
                  <p className="text-sm text-gray-600">
                    @{notificationSettings.botUsername}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  botConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {botConnected ? 'Подключен' : 'Не подключен'}
                </span>
                {botConnected && (
                  <span className="w-3 h-3 bg-green-500 rounded-full ml-2"></span>
                )}
              </div>
            </div>

            {/* Bot Actions */}
            <div className="grid grid-cols-1 gap-3">
              {!botConnected ? (
                <button 
                  onClick={connectToBot}
                  className="bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  🔗 Подключить бота
                </button>
              ) : (
                <>
                  <button 
                    onClick={() => setCurrentScreen('notifications')}
                    className="bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                  >
                    ⚙️ Настроить уведомления
                  </button>
                  <button 
                    onClick={sendTestNotification}
                    className="bg-purple-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors"
                  >
                    🧪 Тест уведомления
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Premium Status */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Подписка</h2>
            {isPremium ? (
              <div className="text-center py-4">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">👑</span>
                </div>
                <h3 className="text-lg font-bold text-gray-800">Премиум активен</h3>
                <p className="text-gray-600 mb-4">Все функции разблокированы</p>
                
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>✅ Неограниченные активности</p>
                    <p>✅ Персональные программы</p>
                    <p>✅ Подробная аналитика</p>
                    <p>✅ Приоритетная поддержка</p>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setIsPremium(false);
                    if (window.Telegram?.WebApp) {
                      window.Telegram.WebApp.showAlert('Премиум отключен (для демо)');
                    }
                  }}
                  className="text-red-600 hover:text-red-700 text-sm underline"
                >
                  Отключить премиум (для теста)
                </button>
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="text-6xl mb-4">💎</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">Разблокируй все возможности</h3>
                <p className="text-gray-600 mb-4">
                  Получи доступ ко всем функциям приложения
                </p>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-gray-600 space-y-2">
                    <div className="flex items-center justify-center">
                      <span className="text-purple-500 mr-2">👑</span>
                      <span>Все активности без ограничений</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-blue-500 mr-2">📊</span>
                      <span>Детальная аналитика прогресса</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-green-500 mr-2">🎯</span>
                      <span>Персональные программы развития</span>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="text-orange-500 mr-2">📚</span>
                      <span>Эксклюзивные материалы</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Стоимость:</span>
                    <span className="text-2xl font-bold text-purple-600">299₽/мес</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">или 50 ⭐ Telegram Stars</p>
                </div>

                <button 
                  onClick={() => setShowPayment(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  Подписаться на премиум
                </button>
              </div>
            )}
          </div>

          {/* App Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">О приложении</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Версия</span>
                <span className="font-medium text-gray-800">1.0.0</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Разработчик</span>
                <span className="font-medium text-gray-800">Развивайка Team</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Последнее обновление</span>
                <span className="font-medium text-gray-800">23.01.2025</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-gray-600">Telegram Bot</span>
                <span className="font-medium text-gray-800">@{notificationSettings.botUsername}</span>
              </div>
            </div>
          </div>

          {/* Support & Feedback */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Поддержка</h2>
            <div className="space-y-3">
              <button 
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.openLink('https://t.me/razvivayка_support');
                  } else {
                    window.open('https://t.me/razvivayка_support', '_blank');
                  }
                }}
                className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <span className="mr-2">💬</span>
                Написать в поддержку
              </button>
              
              <button 
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.showPopup({
                      title: 'Оценить приложение',
                      message: 'Нравится приложение? Поставьте оценку!',
                      buttons: [
                        {id: 'rate', type: 'default', text: 'Оценить'},
                        {id: 'cancel', type: 'cancel', text: 'Отмена'}
                      ]
                    }, (buttonId) => {
                      if (buttonId === 'rate') {
                        window.Telegram.WebApp.showAlert('Спасибо за оценку! ⭐⭐⭐⭐⭐');
                      }
                    });
                  } else {
                    alert('Спасибо за оценку! ⭐⭐⭐⭐⭐');
                  }
                }}
                className="w-full bg-yellow-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center justify-center"
              >
                <span className="mr-2">⭐</span>
                Оценить приложение
              </button>
              
              <button 
                onClick={() => {
                  if (window.Telegram?.WebApp) {
                    window.Telegram.WebApp.openLink('https://razvivayка.ru/privacy');
                  } else {
                    window.open('https://razvivayка.ru/privacy', '_blank');
                  }
                }}
                className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-gray-600 transition-colors flex items-center justify-center"
              >
                <span className="mr-2">📋</span>
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Остальные экраны (заглушка)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center">
          <button 
            onClick={() => setCurrentScreen('main')}
            className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-2xl">←</span>
          </button>
          <h1 className="text-xl font-bold text-gray-800">Экран: {currentScreen}</h1>
        </div>
      </div>
      
      <div className="px-4 py-20 text-center">
        <h2 className="text-xl font-bold mb-4">Раздел в разработке</h2>
        <p className="text-gray-600 mb-6">Функционал будет добавлен в следующих версиях</p>
        <button 
          onClick={() => setCurrentScreen('main')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  );

};

export default ChildDevelopmentApp;
