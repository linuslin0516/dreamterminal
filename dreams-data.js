// Sample dreams data
// In production, this would come from a database/API

const dreamsData = [
    {
        id: 'DRM-0001',
        content: 'I was swimming through a library. The books were breathing. Each page I touched showed me a memory I never lived.',
        tags: ['water', 'books', 'memory'],
        date: '2024-01-15',
        interpretation: 'Water often represents the unconscious mind. Libraries symbolize knowledge and accumulated wisdom. Swimming through breathing books suggests you are navigating through emotional knowledge or processing memories in a fluid, organic way.'
    },
    {
        id: 'DRM-0002',
        content: 'A city where buildings grew like trees. I climbed a skyscraper made of bark and leaves. At the top, I could see yesterday.',
        tags: ['city', 'nature', 'time'],
        date: '2024-01-16'
    },
    {
        id: 'DRM-0003',
        content: 'My reflection stepped out of the mirror and walked away. I tried to follow but my feet were rooted to the ground.',
        tags: ['mirror', 'identity', 'paralysis'],
        date: '2024-01-17'
    },
    {
        id: 'DRM-0004',
        content: 'Everyone spoke backwards. I was the only one who noticed. When I tried to tell them, they looked at me like I was the strange one.',
        tags: ['language', 'isolation', 'reversal'],
        date: '2024-01-18'
    },
    {
        id: 'DRM-0005',
        content: 'I found a door in my childhood bedroom that was never there before. Behind it was an ocean. I could hear my name in the waves.',
        tags: ['door', 'ocean', 'childhood'],
        date: '2024-01-19'
    },
    {
        id: 'DRM-0006',
        content: 'The sky was falling up. People held onto the ground to avoid floating away. I let go.',
        tags: ['falling', 'sky', 'freedom'],
        date: '2024-01-20'
    },
    {
        id: 'DRM-0007',
        content: 'I was at a party where everyone wore masks of my face. When I tried to leave, I realized I was also wearing a mask.',
        tags: ['mask', 'identity', 'party'],
        date: '2024-01-21'
    },
    {
        id: 'DRM-0008',
        content: 'Walking through a forest where every tree was made of glass. When I touched one, it shattered and released a bird made of light.',
        tags: ['forest', 'glass', 'transformation'],
        date: '2024-01-22'
    },
    {
        id: 'DRM-0009',
        content: 'My hands were dissolving into sand. I tried to hold onto things but everything slipped through my fingers. Eventually I became the desert.',
        tags: ['transformation', 'desert', 'loss'],
        date: '2024-01-23'
    },
    {
        id: 'DRM-0010',
        content: 'I was reading a book that was writing itself. The words appeared as I read them, but they told the story of my future.',
        tags: ['books', 'future', 'time'],
        date: '2024-01-24'
    },
    {
        id: 'DRM-0011',
        content: 'There was a staircase in my house that led to nowhere. I climbed it anyway. At the top, I found a room that was bigger than the entire house.',
        tags: ['stairs', 'house', 'impossible'],
        date: '2024-01-25'
    },
    {
        id: 'DRM-0012',
        content: 'All the clocks were running backwards. People were getting younger. I watched myself become a child again.',
        tags: ['time', 'reversal', 'childhood'],
        date: '2024-01-26'
    },
    {
        id: 'DRM-0013',
        content: 'I could see through walls but only when nobody was looking. The moment someone noticed me, the world became solid again.',
        tags: ['vision', 'walls', 'observation'],
        date: '2024-01-27'
    },
    {
        id: 'DRM-0014',
        content: 'My shadow had a mind of its own. It kept trying to walk in a different direction. When I finally let it go, it led me home.',
        tags: ['shadow', 'separation', 'home'],
        date: '2024-01-28'
    },
    {
        id: 'DRM-0015',
        content: 'I was in a museum where all the paintings were blank. As I walked by, they started to fill in with scenes from my life.',
        tags: ['museum', 'memory', 'art'],
        date: '2024-01-29'
    },
    {
        id: 'DRM-0016',
        content: 'There was a phone that only rang when I was alone. When I answered, it was always my own voice telling me things I forgot.',
        tags: ['phone', 'voice', 'memory'],
        date: '2024-01-30'
    },
    {
        id: 'DRM-0017',
        content: 'I was walking on the ceiling. Gravity had reversed but only for me. Everyone else walked on the floor and thought I was the one upside down.',
        tags: ['gravity', 'reversal', 'perspective'],
        date: '2024-01-31'
    },
    {
        id: 'DRM-0018',
        content: 'My words turned into birds when I spoke. They flew away before anyone could hear them. I tried to catch them but they were already gone.',
        tags: ['birds', 'language', 'communication'],
        date: '2024-02-01'
    },
    {
        id: 'DRM-0019',
        content: 'I was in a room with infinite doors. Each one led to a different version of my life. I could only choose one.',
        tags: ['door', 'choice', 'parallel'],
        date: '2024-02-02'
    },
    {
        id: 'DRM-0020',
        content: 'The moon came down and sat next to me. It told me secrets about the night. When I woke up, I could still remember them but they made no sense.',
        tags: ['moon', 'secrets', 'night'],
        date: '2024-02-03'
    }
];
