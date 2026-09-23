window.portfolioData = {
  games: [
    {
      title: 'Jump, Jane, Jump!',
      type: 'Endless Runner',
      description: 'Βοήθησε τη Jane να πηδήξει, να αποφύγει τα εμπόδια και να φτάσει όσο πιο μακριά μπορεί!',
      thumbnail: 'assets/thumbnails/project-01.png',
      url: 'https://script.google.com/macros/s/AKfycbxYvqOn_1rVEJBAKQqDDFWkPUcgcDd6FUWGheQ0Vsw3Q3c3uxBhibjvF8ZBkAYj0uS_/exec'
    },
    {
      title: 'Football Quiz',
      type: 'Quiz',
      description: 'Δοκίμασε τις ποδοσφαιρικές σου γνώσεις και δες πόσες σωστές απαντήσεις μπορείς να πετύχεις!',
      thumbnail: 'assets/thumbnails/project-02.png',
      url: 'https://script.google.com/macros/s/AKfycby9VjsFQRscs31nee04lRqo0tWI1c_1_A3zS4QcH-nBpe4niIRMHRKePxg9LFLLVKCTaQ/exec?refresh=9'
    },
    {
      title: 'Fun Quiz',
      type: 'Quiz',
      description: 'Ένα διασκεδαστικό quiz με απρόβλεπτες ερωτήσεις που δοκιμάζουν τις γνώσεις σου.',
      thumbnail: 'assets/thumbnails/project-03.png',
      url: 'https://script.google.com/macros/s/AKfycbwaOjcbJKPLoguRQKUeBI5E_qTJfhJoyaSOLghtDii1lvXY7mUfu8kOyGA0EU02COz42w/exec'
    }
  ],
  media: [
    'media-01.jpg', 'media-02.jpg', 'media-03.jpg',
    'media-04.jpg', 'media-05.jpg', 'media-06.jpg'
  ].map(file => ({ thumbnail: `assets/images/${file}` }))
};
