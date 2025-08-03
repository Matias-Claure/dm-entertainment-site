document.addEventListener('DOMContentLoaded', () => {
  /*
   * Responsive navigation toggle
   * When the viewport is narrow we hide the menu items by default and reveal
   * them when the hamburger icon is clicked. This logic simply toggles the
   * `hidden` class on the mobile menu container. The desktop menu remains
   * visible via the `md:flex` class defined in the markup.
   */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('hidden');
    });
  }

  /*
   * Event catalogue definition
   * Each entry contains all of the information necessary to build a card on
   * the events listing pages. These objects are also reused by the search
   * filtering system below. If you add new events, be sure to assign a
   * category of either `music`, `cultural` or `sports` so that the filter
   * dropdown works correctly.
   */
  const events = [
    {
      title: 'Fema Kuti',
      date: 'August 8, 2025',
      time: '8:00 PM - 10:00 PM',
      price: '$40-$60',
      location: 'Fonda Theatre, 6126 Hollywood Blvd, Los Angeles',
      category: 'music',
      description: 'Fema Kuti and the Positive Force bring Afrobeat energy to the Fonda Theatre.',
      link: 'event-fema-kuti.html',
      // An image path is still defined here for completeness, but the
      // events listing now uses a color gradient header instead of
      // loading external image assets. See renderEvents() for details.
      img: 'assets/images/hero.png'
    },
    {
      title: 'King Gizzard & The Lizard Wizard',
      date: 'August 10, 2025',
      time: '7:00 PM',
      price: 'See venue',
      location: 'Hollywood Bowl, Los Angeles',
      category: 'music',
      description: 'A KCRW Festival stop on the Phantom Island tour featuring the Hollywood Bowl Orchestra.',
      link: 'event-king-gizzard.html',
      img: 'assets/images/hero.png'
    },
    {
      title: 'Shakira with Black Eyed Peas',
      date: 'August 5, 2025',
      time: '7:30 PM',
      price: 'See venue',
      location: 'SoFi Stadium, Inglewood',
      category: 'music',
      description: 'Part of the Las Mujeres Ya No Lloran World Tour featuring special guests Black Eyed Peas.',
      link: 'event-shakira.html',
      img: 'assets/images/hero.png'
    },
    {
      title: 'Ben Harper & The Innocent Criminals',
      date: 'August 24, 2025',
      time: '8:00 PM - 10:00 PM',
      price: '$25-$150',
      location: 'Orpheum Theatre, 842 S Broadway, Los Angeles',
      category: 'music',
      description: 'Grammy-winning singer-songwriter Ben Harper reunites with The Innocent Criminals for a night of soulful rock.',
      link: 'event-ben-harper.html',
      img: 'assets/images/hero.png'
    },
    {
      title: 'UCLA vs. Utah - Season Opener',
      date: 'August 30, 2025',
      time: '8:00 PM - 11:00 PM',
      price: '$30-$210',
      location: 'Rose Bowl, 1001 Rose Bowl Dr., Pasadena',
      category: 'sports',
      description: 'Kick off the college football season as the UCLA Bruins host the Utah Utes at the historic Rose Bowl.',
      link: 'event-ucla-utah.html',
      img: 'assets/images/sports.png'
    }
  ];

  /*
   * Dynamic card rendering
   * This function empties the container and then iterates over the provided
   * array of event objects, constructing a card for each entry. The markup
   * includes an image header, event metadata and a call to action button.
   */
  function renderEvents(eventList) {
    const container = document.getElementById('eventsContainer');
    if (!container) return;
    container.innerHTML = '';
    eventList.forEach(ev => {
      const card = document.createElement('div');
      // Assign a color gradient to the card header based on the event category.
      // This avoids the need to download external image files when the site
      // is hosted via GitHub Pages. Feel free to adjust or expand these
      // mappings for additional categories.
      const categoryColors = {
        music: 'from-purple-600 to-indigo-600',
        cultural: 'from-pink-500 to-red-500',
        sports: 'from-green-600 to-blue-600'
      };
      const headerGradient = categoryColors[ev.category] || 'from-indigo-600 to-purple-600';

      card.className = 'rounded-lg shadow-lg overflow-hidden flex flex-col bg-white';
      card.innerHTML = `
        <div class="h-40 bg-gradient-to-r ${headerGradient}"></div>
        <div class="p-6 flex flex-col flex-1">
          <h3 class="text-xl font-semibold mb-2">${ev.title}</h3>
          <p class="text-gray-600 mb-1"><i class="far fa-calendar-alt text-indigo-600 mr-2"></i>${ev.date}</p>
          <p class="text-gray-600 mb-1"><i class="far fa-clock text-indigo-600 mr-2"></i>${ev.time}</p>
          <p class="text-gray-600 mb-1"><i class="fas fa-map-marker-alt text-indigo-600 mr-2"></i>${ev.location}</p>
          <p class="text-gray-600 mb-4 flex-1">${ev.description}</p>
          <div class="mt-auto flex items-center justify-between">
            <span class="inline-block bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full">${ev.category.charAt(0).toUpperCase() + ev.category.slice(1)}</span>
            <a href="${ev.link}" class="ml-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition duration-300">View Details</a>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  /*
   * Search and category filter logic
   * Listens for input events on the search bar and change events on the
   * category dropdown. The filter combines both criteria and re-renders
   * the card list each time the user makes a change. Search terms are
   * matched against the event title and description.
   */
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : 'all';
    const filtered = events.filter(ev => {
      const matchesQuery = ev.title.toLowerCase().includes(query) || ev.description.toLowerCase().includes(query);
      const matchesCategory = category === 'all' || ev.category === category;
      return matchesQuery && matchesCategory;
    });
    renderEvents(filtered);
  }
  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);

  // Initial render of all events if the container exists on the page.
  renderEvents(events);
});
