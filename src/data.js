/* Beyond the Bell content.
 *
 * Every description here is GEMS copy, taken verbatim from the parent-facing
 * activity modules document, with two punctuation changes: em dashes become
 * colons or commas. Nothing is invented. Where GEMS wrote an activity name two
 * ways across campuses (Soccer at Gurgaon, Football elsewhere; Basket Ball and
 * Basketball) both spellings are kept as they were supplied, and ALIASES below
 * makes search treat them as one.
 */

window.BTB = (function () {
  var CATEGORIES = [
    { key: 'sport', name: 'Sports',
      blurb: 'From a first lesson to competitive play, students can develop skills, confidence and a love for sport across the field, court, mat and water.' },
    { key: 'arts', name: 'Performing Arts',
      blurb: 'A space to express, perform and find confidence through movement, music and drama.' },
    { key: 'tech', name: 'Innovation & Technology',
      blurb: 'Opportunities to explore the technologies and ideas shaping the world around them.' },
    { key: 'life', name: 'Life Skills',
      blurb: 'Experiences that help children think independently, communicate confidently and work effectively with others.' },
    { key: 'ent', name: 'Entrepreneurship',
      blurb: 'Opportunities to think creatively, solve problems and turn ideas into possibilities.' },
    { key: 'design', name: 'Creativity & Design',
      blurb: 'A space to make, design, build and bring ideas to life.' },
    { key: 'future', name: 'Future-Focused Opportunities',
      blurb: 'New experiences that evolve with our students, our schools and the world around them.' }
  ];

  var ACTIVITIES = {
    'Cricket': {
      cat: 'sport',
      cover: 'Cricket fundamentals, batting, bowling, fielding, match play and game awareness.',
      diff: 'Structured skill-building with teamwork, discipline and match experience.' },
    'Badminton': {
      cat: 'sport',
      cover: 'Grip, serves, footwork, strokes, rallies and match play.',
      diff: 'Progressive racquet-skill development with focus, agility and coordination.' },
    'Soccer': {
      cat: 'sport',
      cover: 'Ball control, passing, dribbling, shooting, positioning and team play.',
      diff: 'More than play: building football skills, decision-making and teamwork.' },
    'Football': {
      cat: 'sport',
      cover: 'Ball control, passing, dribbling, shooting, positioning and match tactics.',
      diff: 'Developing football skills alongside teamwork, decision-making and fitness.',
      tag: 'More than just playing the game.',
      lead: 'Children build ball skills, teamwork and game awareness through progressive practice and match situations.',
      modules: ['Ball Control', 'Passing & Dribbling', 'Shooting', 'Team Play', 'Match Strategy'] },
    'Boxing': {
      cat: 'sport',
      cover: 'Stance, guard, footwork, basic techniques, fitness and safety.',
      diff: 'A structured introduction to technique, fitness, focus and self-discipline.' },
    'Swimming': {
      cat: 'sport',
      cover: 'Water safety, body position, breathing, stroke basics and endurance.',
      diff: 'Progressive swimming skills built around confidence, technique and safety.' },
    'Pickleball': {
      cat: 'sport',
      cover: 'Grip, ready position, serve, groundstrokes, positioning and game play.',
      diff: 'A progressive introduction to a fast-growing racquet sport through structured skills and game play.' },
    'Basketball': {
      cat: 'sport',
      cover: 'Dribbling, passing, shooting, defence and game strategy.',
      diff: 'Building coordination, agility, teamwork and game awareness.' },
    'Basket Ball': {
      cat: 'sport',
      cover: 'Dribbling, passing, shooting, defence and game strategy.',
      diff: 'Children build coordination, agility and game awareness through progressive drills, teamwork and game situations.' },
    'Martial Arts': {
      cat: 'sport',
      cover: 'Stance, movement, basic techniques, forms, fitness and safety.',
      diff: 'Building discipline, focus, confidence and controlled movement.' },
    'Skating': {
      cat: 'sport',
      cover: 'Equipment and safety, balance, gliding, turns, stopping and skill progression.',
      diff: 'A progressive journey from basic balance to confident movement and control.',
      tag: 'More than learning to skate.',
      lead: 'A structured progression from balance and basic movement to turns, stopping, speed control and confidence.',
      modules: ['Fundamentals', 'Balance', 'Turns & Stops', 'Speed & Control', 'Skills & Challenges'] },
    'Gymnastics': {
      cat: 'sport',
      cover: 'Mobility, conditioning, fundamental movements, balance, jumps and routines.',
      diff: 'Building strength, flexibility, body control and confidence through progressive skills.' },
    'Shooting': {
      cat: 'sport',
      cover: 'Safety and equipment, stance, aiming, controlled practice and scoring.',
      diff: 'Developing focus, precision, patience and responsible sporting practice.' },
    'Yoga': {
      cat: 'sport',
      cover: 'Breathing, foundational postures, balance, flexibility, relaxation and mindfulness.',
      diff: 'Mindful movement that develops balance, flexibility, focus and self-awareness.' },
    'Mountaineering': {
      cat: 'sport',
      cover: 'Safety and equipment, movement skills, navigation awareness, team challenges and reflection.',
      diff: 'An adventure-based experience focused on resilience, teamwork, confidence and risk awareness.' },
    'Dance': {
      cat: 'arts',
      cover: 'Rhythm, movement, choreography, expression and performance.',
      diff: 'A space to build creativity, confidence, coordination and self-expression.',
      tag: 'Move. Express. Perform.',
      lead: 'A structured creative journey combining rhythm, movement, choreography and performance.',
      modules: ['Rhythm', 'Movement', 'Choreography', 'Expression', 'Performance'] },
    'Dance and Aerobics': {
      cat: 'arts',
      cover: 'Rhythm, warm-up, aerobic movement, coordination, choreography and performance.',
      diff: 'Combining fitness, movement and creative expression.' },
    'Music': {
      cat: 'arts',
      cover: 'Rhythm, listening, voice and instrument basics, practice and performance.',
      diff: 'Developing musicality, confidence, listening and creative expression.' },
    /* No numbered modules here on purpose. GEMS presents a progression for four
       activities only: Football, Skating, Chess and Dance. Trinity's five parts
       come from the Kochi activity table, where they are listed as what the
       programme covers, not as an order to work through. They stay in `cover`. */
    'Trinity Programme': {
      cat: 'arts',
      cover: 'Dance and movement, drama and role play, voice and expression, storytelling and performance.',
      diff: 'A structured performing arts programme where children develop creativity, expression, confidence and communication through dance and drama.' },
    'Chess': {
      cat: 'life',
      cover: 'Board and pieces, opening principles, tactics, strategy and game analysis.',
      diff: 'Developing strategic thinking, planning, patience and problem-solving.',
      tag: 'Think. Plan. Play.',
      lead: 'Children develop strategic thinking through progressive learning of tactics, strategy and game analysis.',
      modules: ['Board & Pieces', 'Openings', 'Tactics', 'Strategy', 'Game Analysis'] },
    /* One programme with three strands. GEMS counts the strands separately to
       reach eight activities at Kochi; the name is a single brand and is always
       written in full, so it is one entry here and sits in the three categories
       its own strands cover. */
    'Bower School of Entrepreneurship': {
      cats: ['ent', 'life', 'tech'],
      strands: ['Financial Literacy', 'Entrepreneurship', 'Artificial Intelligence'],
      cover: 'Financial awareness, understanding money and making everyday decisions with confidence. Idea generation, problem-solving and turning ideas into action. AI awareness: understanding how artificial intelligence works and where it shows up in daily life.',
      diff: 'Building practical money sense from an early age, bringing creativity and practical thinking together to build and test ideas, and preparing children for a future shaped by technology.' }
  };

  /* state: 'on' running now, 'soon' planned. Nothing here is unconfirmed: a
     campus a parent can see has to be one GEMS has placed in one of the two
     groups. See UNCONFIRMED below. */
  var SCHOOLS = [
    { city: 'Kochi', brand: 'GEMS Modern Academy', state: 'on',
      acts: ['Basketball', 'Football', 'Badminton', 'Chess', 'Trinity Programme',
             'Bower School of Entrepreneurship'] },
    { city: 'Gurgaon', brand: 'GEMS Millennium School', state: 'on',
      acts: ['Cricket', 'Badminton', 'Soccer', 'Boxing', 'Swimming', 'Pickleball', 'Basket Ball'] },
    { city: 'Varanasi', brand: 'GEMS Millennium School', state: 'on',
      acts: ['Cricket', 'Basketball', 'Swimming'] },
    { city: 'Indirapuram', brand: 'GEMS Millennium School', state: 'soon',
      acts: ['Swimming', 'Gymnastics', 'Shooting', 'Football', 'Dance and Aerobics',
             'Pickleball', 'Yoga', 'Mountaineering'] },
    { city: 'Jodhpur', brand: 'GEMS School of Excellence', state: 'soon',
      acts: ['Cricket', 'Football', 'Basketball', 'Dance', 'Music'] },
    { city: 'Lucknow', brand: 'GEMS School of Excellence', state: 'soon',
      acts: ['Martial Arts', 'Football', 'Skating', 'Music', 'Dance'] },
    { city: 'Vikhroli, Mumbai', brand: 'GEMS Millennium School', state: 'soon', acts: [] },
    { city: 'Kalyan, Mumbai', brand: 'GEMS Millennium School', state: 'soon', acts: [] },
    { city: 'Coimbatore', brand: 'GEMS Modern Academy', state: 'soon', acts: [] }
  ];

  /* Both have live campus websites, and both are absent from every GEMS
     document: neither listed as running nor as coming soon. Until someone at
     GEMS places them, they stay off the page rather than being shown to a
     parent as a campus with an unknown status. Nothing renders this list. */
  var UNCONFIRMED = [
    { city: 'Kochi', brand: 'GEMS Millennium School' },
    { city: 'Raipur', brand: 'GEMS Millennium School' }
  ];

  /* GEMS names the same activity two ways across campuses. A parent should not
     have to guess which spelling their school used. */
  var ALIASES = [
    ['football', 'soccer'],
    ['basketball', 'basket ball'],
    ['pickleball', 'pickle ball'],
    ['karate', 'martial arts'],
    ['drama', 'trinity'],
    ['theatre', 'trinity'],
    ['ai', 'artificial intelligence'],
    ['money', 'financial'],
    ['business', 'entrepreneurship'],
    ['gym', 'gymnastics']
  ];

  /* The same sport under two names counts once. */
  var SAME = { 'Soccer': 'Football', 'Basket Ball': 'Basketball', 'Dance and Aerobics': 'Dance' };

  function distinctPursuits() {
    var seen = {};
    SCHOOLS.forEach(function (s) {
      s.acts.forEach(function (a) { seen[SAME[a] || a] = true; });
    });
    return Object.keys(seen).length;
  }

  function totalPlaces() {
    return SCHOOLS.reduce(function (n, s) { return n + s.acts.length; }, 0);
  }

  function byCategory(key) {
    var seen = {}, out = [];
    SCHOOLS.forEach(function (s) {
      s.acts.forEach(function (a) {
        var meta = ACTIVITIES[a];
        if (!meta) return;
        var cats = meta.cats || [meta.cat];
        if (cats.indexOf(key) === -1) return;
        var label = SAME[a] || a;
        if (!seen[label]) { seen[label] = true; out.push(label); }
      });
    });
    return out;
  }

  /* Only the categories a campus actually offers. A category with nothing
     behind it is a promise the network cannot keep yet, so the page leaves it
     out; it reappears on its own the day a school lists an activity for it. */
  function liveCategories() {
    return CATEGORIES.filter(function (c) { return byCategory(c.key).length > 0; });
  }

  return {
    CATEGORIES: CATEGORIES,
    liveCategories: liveCategories,
    ACTIVITIES: ACTIVITIES,
    SCHOOLS: SCHOOLS,
    UNCONFIRMED: UNCONFIRMED,
    ALIASES: ALIASES,
    SAME: SAME,
    distinctPursuits: distinctPursuits,
    totalPlaces: totalPlaces,
    byCategory: byCategory
  };
})();
