import React, { useState } from 'react';

const ChildDevelopmentApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [isPremium, setIsPremium] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [child, setChild] = useState({
    name: 'Андрей',
    age: 2,
    streak: 7
  });

  // Настройки уведомлений
  const [notificationSettings, setNotificationSettings] = useState({
    enabled: true,
    time: '19:00',
    frequency: 'daily',
    reminderType: 'motivational',
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

  // База материалов библиотеки
  const [libraryContent] = useState({
    categories: [
      { id: 'development', name: 'Развитие', icon: '🧠', count: 23 },
      { id: 'health', name: 'Здоровье', icon: '🏥', count: 18 },
      { id: 'education', name: 'Обучение', icon: '📖', count: 31 },
      { id: 'psychology', name: 'Психология', icon: '💭', count: 15 },
      { id: 'nutrition', name: 'Питание', icon: '🍎', count: 12 },
      { id: 'safety', name: 'Безопасность', icon: '🛡️', count: 9 }
    ],
    articles: [
      {
        id: 1,
        title: 'Как развивать речь у ребенка 2-3 лет',
        description: 'Практические советы для развития речевых навыков в раннем возрасте',
        readTime: '5 мин',
        category: 'development',
        premium: false,
        author: 'Логопед Анна Петрова',
        rating: 4.8,
        views: 1247
      },
      {
        id: 2,
        title: 'Лучшие игры для развития мелкой моторики',
        description: 'Простые упражнения и игры для укрепления мышц рук и пальцев',
        readTime: '7 мин',
        category: 'development',
        premium: false,
        author: 'Педиатр Мария Иванова',
        rating: 4.9,
        views: 987
      },
      {
        id: 3,
        title: 'Подготовка к школе: чек-лист для родителей',
        description: 'Что должен уметь ребенок перед поступлением в первый класс',
        readTime: '10 мин',
        category: 'education',
        premium: true,
        author: 'Педагог Ольга Волкова',
        rating: 4.9,
        views: 1543
      },
      {
        id: 4,
        title: 'Детские страхи: как помочь ребенку',
        description: 'Работаем с типичными страхами детей разного возраста',
        readTime: '6 мин',
        category: 'psychology',
        premium: true,
        author: 'Психолог Дмитрий Козлов',
        rating: 4.6,
        views: 445
      },
      {
        id: 5,
        title: 'Здоровое питание для дошкольников',
        description: 'Составляем сбалансированное меню для детей 3-6 лет',
        readTime: '8 мин',
        category: 'nutrition',
        premium: true,
        author: 'Диетолог Елена Сидорова',
        rating: 4.7,
        views: 756
      }
    ],
    videos: [
      {
        id: 1,
        title: 'Массаж для малышей: укрепляем здоровье',
        duration: '15 мин',
        category: 'health',
        premium: false,
        thumbnail: '👶',
        views: 2341
      },
      {
        id: 2,
        title: 'Творческие занятия с детьми 4-6 лет',
        duration: '22 мин',
        category: 'development',
        premium: true,
        thumbnail: '🎨',
        views: 1567
      }
    ]
  });

  // РАСШИРЕННАЯ база активностей
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
  const [notificationHistory] = useState([
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

  const getSkillName = (key) => {
    const names = {
      motor: 'Мелкая моторика',
      speech: 'Речь и коммуникация', 
      logic: 'Логическое мышление',
      creativity: 'Творческие способности',
      development: 'Общее развитие'
    };
    return names[key];
  };

  const getSkillColor = (key) => {
    const colors = {
      motor: 'bg-blue-500',
      speech: 'bg-green-500',
      logic: 'bg-purple-500', 
      creativity: 'bg-pink-500',
      development: 'bg-orange-500'
    };
    return colors[key];
  };

  const getCategoryInfo = (categoryId) => {
    return libraryContent.categories.find(cat => cat.id === categoryId);
  };

  const getFilteredArticles = () => {
    if (selectedCategory === 'all') {
      return libraryContent.articles;
    }
    return libraryContent.articles.filter(article => article.category === selectedCategory);
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

  // Главный экран
  if (currentScreen === 'main') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="bg-white shadow-sm px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Привет, {child.name}! 👋</h1>
              <p className="text-gray-600">Возраст: {child.age} {getAgeText(child.age)}</p>
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
                {notificationSettings.enabled && (
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

        {/* Notification Preview */}
        {notificationSettings.enabled && (
          <div className="mx-4 mt-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold flex items-center">🔔 Напоминания включены</h3>
                <p className="text-sm opacity-90">Следующее в {notificationSettings.time}</p>
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
                onClick={() => setIsPremium(true)}
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
                       <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors text-sm">
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
                         onClick={() => isPremium ? setSelectedActivity(activity) : setIsPremium(true)}
                         className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                           isPremium 
                             ? 'bg-blue-500 text-white hover:bg-blue-600' 
                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         }`}
                       >
                         {isPremium ? 'Подробнее' : 'Премиум'}
                       </button>
                       <button 
                         className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                           isPremium 
                             ? 'bg-purple-500 text-white hover:bg-purple-600' 
                             : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         }`}
                         disabled={!isPremium}
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
             <button 
               onClick={() => setIsPremium(true)}
               className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
             >
               Подключить премиум - 299₽/мес
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
           <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-medium text-lg hover:from-green-600 hover:to-blue-600 transition-all">
             🚀 Начать активность
           </button>
           
           <div className="grid grid-cols-2 gap-3">
             <button className="bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors">
               ⏰ Установить таймер
             </button>
             <button className="bg-white text-gray-700 py-3 rounded-lg font-medium border-2 border-gray-200 hover:border-gray-300 transition-colors">
               📸 Сохранить результат
             </button>
           </div>
         </div>
       </div>
     </div>
   );
 }

 // Экран прогресса
 if (currentScreen === 'progress') {
   const completedThisWeek = progressData.weeklyActivities.filter(Boolean).length;
   const totalDaysThisWeek = 7;

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
             <h1 className="text-xl font-bold text-gray-800">Прогресс развития</h1>
             <p className="text-sm text-gray-600">{child.name} • {child.age} {getAgeText(child.age)}</p>
           </div>
         </div>
       </div>

       <div className="px-4 py-6">
         <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
           <div className="flex items-center justify-between mb-4">
             <h2 className="text-lg font-bold text-gray-800">Эта неделя</h2>
             <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
               <span className="text-sm font-medium text-green-800">🔥 {child.streak} дней подряд</span>
             </div>
           </div>
           
           <div className="grid grid-cols-7 gap-2 mb-4">
             {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day, index) => (
               <div key={day} className="text-center">
                 <div className="text-xs text-gray-600 mb-1">{day}</div>
                 <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                   progressData.weeklyActivities[index] ? 'bg-green-500 text-white' : 'bg-gray-200'
                 }`}>
                   {progressData.weeklyActivities[index] ? '✓' : ''}
                 </div>
               </div>
             ))}
           </div>
           
           <div className="bg-gray-100 rounded-lg p-4">
             <div className="flex items-center justify-between mb-2">
               <span className="text-gray-700">Выполнено активностей</span>
               <span className="font-bold text-green-600">{completedThisWeek} из {totalDaysThisWeek}</span>
             </div>
             <div className="w-full bg-gray-200 rounded-full h-2">
               <div 
                 className="h-2 rounded-full bg-green-500"
                 style={{ width: `${(completedThisWeek / totalDaysThisWeek) * 100}%` }}
               ></div>
             </div>
           </div>
         </div>

         <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Развитие навыков</h2>
           <div className="space-y-4">
             {Object.entries(progressData.skillsProgress).map(([key, progress]) => (
               <div key={key}>
                 <div className="flex justify-between items-center mb-2">
                   <span className="text-sm font-medium text-gray-700">{getSkillName(key)}</span>
                   <span className="text-sm text-gray-500">{progress}%</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                   <div 
                     className={`h-2 rounded-full ${getSkillColor(key)}`}
                     style={{ width: `${progress}%` }}
                   ></div>
                 </div>
               </div>
             ))}
           </div>
         </div>

         <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Достижения</h2>
           <div className="grid grid-cols-2 gap-4">
             {progressData.achievements.map((achievement) => (
               <div 
                 key={achievement.id} 
                 className={`p-4 rounded-lg border-2 ${
                   achievement.unlocked 
                     ? 'border-yellow-300 bg-yellow-50' 
                     : 'border-gray-200 bg-gray-50'
                 }`}
               >
                 <div className="text-2xl mb-2">{achievement.icon}</div>
                 <h3 className={`font-medium text-sm ${
                   achievement.unlocked ? 'text-yellow-800' : 'text-gray-500'
                 }`}>
                   {achievement.title}
                 </h3>
                 <p className="text-xs text-gray-600 mt-1">{achievement.description}</p>
                 
                 {!achievement.unlocked && achievement.progress && (
                   <div className="mt-3">
                     <div className="flex justify-between text-xs text-gray-500 mb-1">
                       <span>Прогресс</span>
                       <span>{achievement.progress}/15</span>
                     </div>
                     <div className="w-full bg-gray-200 rounded-full h-1">
                       <div 
                         className="h-1 rounded-full bg-yellow-400"
                         style={{ width: `${(achievement.progress / 15) * 100}%` }}
                       ></div>
                     </div>
                   </div>
                 )}
               </div>
             ))}
           </div>
         </div>

         <div className="bg-white rounded-xl p-6 shadow-sm">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Последние активности</h2>
           <div className="space-y-3">
             {progressData.recentActivities.map((activity, index) => (
               <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                 <div className="flex-1">
                   <h3 className="font-medium text-gray-800 text-sm">{activity.name}</h3>
                   <div className="flex items-center gap-2 mt-1">
                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(activity.category)}`}>
                       {activity.category}
                     </span>
                     <span className="text-xs text-gray-500">
                       {new Date(activity.date).toLocaleDateString('ru-RU')}
                     </span>
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-sm font-medium text-gray-700">{activity.duration} мин</p>
                   <span className="text-xs text-gray-500">выполнено</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
       </div>
     </div>
   );
 }

 // Экран библиотеки
 if (currentScreen === 'library') {
   const filteredArticles = getFilteredArticles();
   const freeArticles = filteredArticles.filter(article => !article.premium);
   const premiumArticles = filteredArticles.filter(article => article.premium);

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
             <h1 className="text-xl font-bold text-gray-800">Библиотека</h1>
             <p className="text-sm text-gray-600">Материалы для родителей</p>
           </div>
         </div>
       </div>

       <div className="px-4 py-6">
         {/* Categories */}
         <div className="mb-6">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Категории</h2>
           <div className="grid grid-cols-2 gap-4 mb-4">
             {libraryContent.categories.map((category) => (
               <button
                 key={category.id}
                 onClick={() => setSelectedCategory(category.id)}
                 className={`p-4 rounded-xl text-left transition-all ${
                   selectedCategory === category.id
                     ? 'bg-blue-500 text-white shadow-lg'
                     : 'bg-white shadow-sm hover:shadow-md'
                 }`}
               >
                 <div className="text-2xl mb-2">{category.icon}</div>
                 <h3 className="font-semibold text-sm">{category.name}</h3>
                 <p className={`text-xs ${
                   selectedCategory === category.id ? 'text-blue-100' : 'text-gray-500'
                 }`}>
                   {category.count} материалов
                 </p>
               </button>
             ))}
           </div>
           
           <button
             onClick={() => setSelectedCategory('all')}
             className={`w-full p-3 rounded-lg text-center transition-all ${
               selectedCategory === 'all'
                 ? 'bg-gray-800 text-white'
                 : 'bg-white text-gray-600 hover:bg-gray-100'
             }`}
           >
             Все категории ({libraryContent.articles.length} статей)
           </button>
         </div>

         {/* Featured Videos */}
         <div className="mb-6">
           <h2 className="text-lg font-bold text-gray-800 mb-4">🎥 Популярные видео</h2>
           <div className="space-y-3">
             {libraryContent.videos.map((video) => (
               <div 
                 key={video.id} 
                 className={`bg-white rounded-xl p-4 shadow-sm ${!video.premium || isPremium ? 'hover:shadow-md transition-shadow' : 'opacity-75'}`}
               >
                 <div className="flex items-center justify-between">
                   <div className="flex items-center flex-1">
                     <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                       <span className="text-2xl">{video.thumbnail}</span>
                     </div>
                     <div className="flex-1">
                       <h3 className="font-semibold text-gray-800 flex items-center">
                         {video.title}
                         {video.premium && !isPremium && <span className="ml-2 text-gray-400">🔒</span>}
                       </h3>
                       <div className="flex items-center gap-2 mt-1">
                         <span className="text-xs text-gray-500">⏱️ {video.duration}</span>
                         <span className="text-xs text-gray-500">👁️ {video.views}</span>
                         {video.premium && (
                           <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">
                             Премиум
                           </span>
                         )}
                       </div>
                     </div>
                   </div>
                   <button 
                     className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                       video.premium && !isPremium
                         ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                         : 'bg-red-500 text-white hover:bg-red-600'
                     }`}
                     disabled={video.premium && !isPremium}
                   >
                     {video.premium && !isPremium ? 'Премиум' : 'Смотреть'}
                   </button>
                 </div>
               </div>
             ))}
           </div>
         </div>

         {/* Free Articles */}
         {freeArticles.length > 0 && (
           <div className="mb-6">
             <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
               <span className="text-green-500 mr-2">🆓</span>
               Бесплатные статьи ({freeArticles.length})
             </h2>
             <div className="space-y-3">
               {freeArticles.map((article) => (
                 <div key={article.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                   <div className="flex items-start justify-between">
                     <div className="flex-1">
                       <h3 className="font-semibold text-gray-800 mb-2">{article.title}</h3>
                       <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                       <div className="flex items-center gap-3 text-xs text-gray-500">
                         <span>👤 {article.author}</span>
                         <span>⏱️ {article.readTime}</span>
                         <span>⭐ {article.rating}</span>
                         <span>👁️ {article.views}</span>
                       </div>
                     </div>
                     <button className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                       Читать
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Premium Articles */}
         {premiumArticles.length > 0 && (
           <div className="mb-6">
             <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
               <span className="text-yellow-500 mr-2">👑</span>
               Премиум статьи ({premiumArticles.length})
             </h2>
             <div className="space-y-3">
               {premiumArticles.map((article) => (
                 <div key={article.id} className={`bg-white rounded-xl p-4 shadow-sm ${!isPremium ? 'opacity-75' : 'hover:shadow-md transition-shadow'}`}>
                   <div className="flex items-start justify-between">
                     <div className="flex-1">
                       <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
                         {article.title}
                         {!isPremium && <span className="ml-2 text-gray-400">🔒</span>}
                       </h3>
                       <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                       <div className="flex items-center gap-3 text-xs text-gray-500">
                         <span>👤 {article.author}</span>
                         <span>⏱️ {article.readTime}</span>
                         <span>⭐ {article.rating}</span>
                         <span>👁️ {article.views}</span>
                       </div>
                     </div>
                     <button 
                       className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                         isPremium 
                           ? 'bg-purple-500 text-white hover:bg-purple-600' 
                           : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                       }`}
                       disabled={!isPremium}
                       onClick={() => !isPremium && setIsPremium(true)}
                     >
                       {isPremium ? 'Читать' : 'Премиум'}
                     </button>
                   </div>
                 </div>
               ))}
             </div>
           </div>
         )}

         {/* Upgrade prompt for non-premium users */}
         {!isPremium && premiumArticles.length > 0 && (
           <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white text-center">
             <h3 className="text-lg font-bold mb-2">📚 Доступ ко всей библиотеке!</h3>
             <p className="text-sm opacity-90 mb-4">
               Получи доступ к {premiumArticles.length} эксклюзивным статьям, видеоурокам и материалам от экспертов
             </p>
             <button 
               onClick={() => setIsPremium(true)}
               className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
             >
               Подключить премиум - 299₽/мес
             </button>
           </div>
         )}
       </div>
     </div>
   );
 }

 // Экран настроек уведомлений
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
             <h1 className="text-xl font-bold text-gray-800">Напоминания</h1>
             <p className="text-sm text-gray-600">Настройка уведомлений о занятиях</p>
           </div>
         </div>
       </div>

       <div className="px-4 py-6">
         {/* Main Toggle */}
         <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
           <div className="flex items-center justify-between mb-4">
             <div>
               <h2 className="text-lg font-bold text-gray-800">Уведомления</h2>
               <p className="text-sm text-gray-600">Включить напоминания о занятиях</p>
             </div>
             <button 
               onClick={() => setNotificationSettings({
                 ...notificationSettings, 
                 enabled: !notificationSettings.enabled
               })}
               className={`w-12 h-6 rounded-full p-1 transition-colors ${
                 notificationSettings.enabled ? 'bg-green-500' : 'bg-gray-300'
               }`}
             >
               <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                 notificationSettings.enabled ? 'translate-x-6' : 'translate-x-0'
               }`}></div>
             </button>
           </div>

           {notificationSettings.enabled && (
             <div className="space-y-4">
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
         {notificationSettings.enabled && (
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
         {notificationSettings.enabled && (
           <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
             <h2 className="text-lg font-bold text-gray-800 mb-4">Тестовое уведомление</h2>
             <p className="text-sm text-gray-600 mb-4">
               Посмотрите, как будет выглядеть ваше уведомление
             </p>
             
             <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
               <div className="flex items-center mb-2">
                 <span className="text-blue-500 mr-2">🔔</span>
                 <span className="font-semibold text-blue-900">Развивайка</span>
                 <span className="text-xs text-blue-600 ml-auto">{notificationSettings.time}</span>
               </div>
               <p className="text-blue-800">
                 {getRandomMessage(notificationSettings.reminderType)}
               </p>
             </div>

             <button className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
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

 // Настройки профиля
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
           <h1 className="text-xl font-bold text-gray-800">Настройки</h1>
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

         {/* Premium Status */}
         <div className="bg-white rounded-xl p-6 shadow-sm">
           <h2 className="text-lg font-bold text-gray-800 mb-4">Подписка</h2>
           {isPremium ? (
             <div className="text-center py-4">
               <div className="bg-gradient-to-r from-purple-600 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                 <span className="text-white text-2xl">👑</span>
               </div>
               <h3 className="text-lg font-bold text-gray-800">Премиум активен</h3>
               <p className="text-gray-600">Все активности разблокированы</p>
               <button 
                 onClick={() => setIsPremium(false)}
                 className="mt-4 text-red-600 hover:text-red-700 text-sm"
               >
                 Отключить премиум (для теста)
               </button>
             </div>
           ) : (
             <div className="text-center py-4">
               <h3 className="text-lg font-bold text-gray-800 mb-2">Разблокируй все возможности</h3>
               <p className="text-gray-600 mb-4">
                 • Неограниченные активности<br/>
                 • Персональные программы<br/>
                 • Подробная аналитика
               </p>
               <button 
                 onClick={() => setIsPremium(true)}
                 className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
               >
                 Подписаться - 299₽/мес
               </button>
             </div>
           )}
         </div>
       </div>
     </div>
   );
 }

 // Заглушка для неизвестных экранов
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
