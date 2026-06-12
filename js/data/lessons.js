/* ============================================================
   lessons.js — full course content (29 lessons, real teaching)
   Body is HTML. Tokens expanded by course.js:
     [[scale:ROOT:TYPE]]  -> live scale fretboard SVG
     [[chord:ROOT:TYPE]]  -> live chord diagram SVG
     [[tab: ... ]]        -> monospace tab block
   Exposes window.Lessons
   ============================================================ */
(function () {
  const sections = [
    {
      id: 'notes',
      name: 'Notes',
      lessons: [
        {
          title: 'The musical alphabet',
          eyebrow: 'Notes · Lesson 1',
          body: `
<p>All of Western music is built from just <strong>seven letter names</strong>: A, B, C, D, E, F and G. After G the alphabet starts over at A, so the names cycle endlessly: …E F G A B C D E F G…</p>
<p>Each time you return to the same letter you have travelled one <strong>octave</strong> — the note sounds higher or lower but has the same character. That is why a low E string and the thin high E string share a name.</p>
<h3>Why only seven?</h3>
<p>These seven notes form the <strong>natural notes</strong> — the white keys on a piano. Everything else (the sharps and flats we meet next) sits between them. Learn this cycle cold, in both directions, because every scale, chord and interval is measured against it.</p>
<ul>
<li>Forwards: A → B → C → D → E → F → G → A</li>
<li>Backwards: A → G → F → E → D → C → B → A</li>
</ul>`,
          takeaways: [
            'Music uses only seven letter names, A through G, then repeats.',
            'Returning to the same letter higher or lower is an octave.',
            'The seven naturals are your reference for everything else.'
          ]
        },
        {
          title: 'Sharps, flats and enharmonics',
          eyebrow: 'Notes · Lesson 2',
          body: `
<p>Between most of the natural notes there is a hidden note — a <strong>semitone</strong> (one fret) higher or lower. A <strong>sharp (♯)</strong> raises a note by a semitone; a <strong>flat (♭)</strong> lowers it by a semitone.</p>
<p>So the note between A and B can be called <strong>A♯</strong> (A raised) or <strong>B♭</strong> (B lowered). Same pitch, two names — these are <strong>enharmonic equivalents</strong>. Which name you use depends on the key you are in.</p>
<h3>The two natural half-steps</h3>
<p>There is <em>no</em> note between <strong>E and F</strong>, and none between <strong>B and C</strong>. These pairs are already only a semitone apart. Memorise this — it is the single most useful fact on the fretboard.</p>
<p>The full twelve-note chromatic ladder, ascending from C:</p>
<p class="mono">C · C♯/D♭ · D · D♯/E♭ · E · F · F♯/G♭ · G · G♯/A♭ · A · A♯/B♭ · B · C</p>`,
          takeaways: [
            'A sharp raises by one fret; a flat lowers by one fret.',
            'A♯ and B♭ are the same pitch — enharmonic equivalents.',
            'E–F and B–C have no note between them (natural half-steps).'
          ]
        },
        {
          title: 'Notes on the fretboard — string by string',
          eyebrow: 'Notes · Lesson 3',
          body: `
<p>In standard tuning the six open strings, from the thickest (6th) to the thinnest (1st), are <strong>E A D G B E</strong>. A common phrase to remember them is "Eat A Dead Grasshopper Before Everything".</p>
<p>Every fret you move toward the body raises the pitch by one semitone. So on the low E string: open = E, fret 1 = F (remember, no note between E and F!), fret 2 = F♯, fret 3 = G, and so on.</p>
<h3>Walk each string</h3>
<p>Practise naming notes one string at a time, out loud, using the natural half-steps as checkpoints. The <strong>12th fret</strong> always repeats the open string an octave higher — a built-in landmark.</p>
[[tab: e|--0--1--2--3--4--5--  E F F# G G# A
B|--0--1--2--3--  B C C# D
G|--0--1--2--  G G# A
D|--0--1--2--  D D# E
A|--0--1--2--  A A# B
E|--0--1--2--  E F F#]]`,
          takeaways: [
            'Open strings low-to-high are E A D G B E.',
            'Each fret toward the body is one semitone higher.',
            'The 12th fret repeats the open string one octave up.'
          ]
        },
        {
          title: 'Octaves and the octave pattern',
          eyebrow: 'Notes · Lesson 4',
          body: `
<p>An <strong>octave</strong> is the same note twelve semitones away. On guitar, octaves form fixed visual shapes you can slide anywhere — a fast way to find notes without naming every fret.</p>
<h3>The two main octave shapes</h3>
<ul>
<li><strong>6th → 4th string:</strong> up two strings and <em>across two frets</em>. The note on the D string is one octave above the same finger position two frets back on the low E string.</li>
<li><strong>5th → 3rd string:</strong> same shape — up two strings, across two frets.</li>
</ul>
<p>Because the B string is tuned a little differently, shapes that cross it shift by one fret: the <strong>4th → 2nd</strong> and <strong>3rd → 1st</strong> octaves are up two strings and <em>across three frets</em>.</p>
<p>Pick any note, add its octave shape, and you instantly know a second location for that note. Chain them to map a single note all over the neck.</p>`,
          takeaways: [
            'An octave is the same note, twelve semitones apart.',
            'Strings 6→4 and 5→3: up two strings, across two frets.',
            'Crossing the B string adds one fret to the shape.'
          ]
        },
        {
          title: 'Finding any note on the fretboard',
          eyebrow: 'Notes · Lesson 5',
          body: `
<p>You do not need to memorise all 72 note positions individually. Combine three tools you already have:</p>
<ul>
<li><strong>String anchors:</strong> know the open-string names and their 12th-fret repeats.</li>
<li><strong>Natural half-steps:</strong> E–F and B–C let you count quickly.</li>
<li><strong>Octave shapes:</strong> jump from a known note to its twin elsewhere.</li>
</ul>
<h3>Landmark frets</h3>
<p>The inlay dots at frets <strong>3, 5, 7, 9 and 12</strong> are reference points. For example, the 5th fret of one string usually equals the next open string up (the basis of tuning) — except the G→B pair, which matches at the 4th fret.</p>
<p>Drill: name a random note, then find every place it lives on the neck within twelve frets using octave shapes. Speed comes from pattern recognition, not rote memory.</p>`,
          takeaways: [
            'Combine string anchors, half-steps and octave shapes.',
            'Inlay dots at 3-5-7-9-12 are navigation landmarks.',
            'Find one note everywhere using octave shapes, not memorisation.'
          ]
        }
      ]
    },
    {
      id: 'scales',
      name: 'Scales',
      lessons: [
        {
          title: 'What is a scale',
          eyebrow: 'Scales · Lesson 1',
          body: `
<p>A <strong>scale</strong> is an ordered set of notes spanning an octave, chosen by a fixed pattern of steps. The scale supplies the "alphabet" a piece of music draws its melodies and chords from.</p>
<p>Scales are defined by the <strong>intervals between consecutive notes</strong> — whole steps (W, two frets) and half steps (H, one fret). Start that step-pattern on any note and you get the same flavour of scale in a new key.</p>
<p>Because the pattern is movable, learning <em>one</em> scale shape teaches you all twelve keys of that scale. That is the great efficiency of the guitar.</p>`,
          takeaways: [
            'A scale is a set of notes built by a fixed step pattern.',
            'Steps are whole (two frets) or half (one fret).',
            'Move the pattern to a new root to change key.'
          ]
        },
        {
          title: 'The major scale — whole and half steps',
          eyebrow: 'Scales · Lesson 2',
          body: `
<p>The <strong>major scale</strong> is the foundation of Western harmony. Its step pattern is:</p>
<p class="formula" style="text-align:left">W – W – H – W – W – W – H</p>
<p>Starting on C and following the pattern gives <strong>C D E F G A B C</strong> — all natural notes, no sharps or flats. That is why C major is everyone's first key.</p>
<p>Here is C major mapped across the neck. Amber dots are the root (C); cream dots are the other scale tones:</p>
[[scale:C:major]]
<p>Sing it as "do re mi fa sol la ti do". The bright, resolved sound you hear is the major scale's signature.</p>`,
          takeaways: [
            'Major scale pattern: W W H W W W H.',
            'C major uses only natural notes: C D E F G A B.',
            'It is the reference scale for naming everything else.'
          ]
        },
        {
          title: 'The natural minor scale',
          eyebrow: 'Scales · Lesson 3',
          body: `
<p>The <strong>natural minor</strong> scale has a darker, more melancholic colour. Its pattern is:</p>
<p class="formula" style="text-align:left">W – H – W – W – H – W – W</p>
<p>Starting on A gives <strong>A B C D E F G A</strong> — again all naturals. A natural minor and C major contain the <em>same</em> seven notes; they are <strong>relative</strong> keys, differing only in which note feels like "home".</p>
[[scale:A:natural minor]]
<p>Compared to major, natural minor flattens the 3rd, 6th and 7th degrees. That lowered third is what your ear hears as "minor".</p>`,
          takeaways: [
            'Natural minor pattern: W H W W H W W.',
            'A minor and C major share the same notes (relative keys).',
            'Minor flattens the 3rd, 6th and 7th versus major.'
          ]
        },
        {
          title: 'Major and minor pentatonic',
          eyebrow: 'Scales · Lesson 4',
          body: `
<p><strong>Pentatonic</strong> means five notes. By removing the two notes most likely to clash, pentatonic scales become incredibly forgiving — a favourite for soloing in rock, blues and pop.</p>
<p><strong>Minor pentatonic</strong> removes the 2nd and 6th from natural minor. A minor pentatonic = <strong>A C D E G</strong>:</p>
[[scale:A:pentatonic minor]]
<p><strong>Major pentatonic</strong> removes the 4th and 7th from the major scale. C major pentatonic = <strong>C D E G A</strong>. Like the full scales, they are relative — A minor pentatonic and C major pentatonic share all five notes.</p>`,
          takeaways: [
            'Pentatonic scales have five notes.',
            'Minor pentatonic: 1 ♭3 4 5 ♭7 (A C D E G).',
            'Major and relative-minor pentatonics share the same five notes.'
          ]
        },
        {
          title: 'The blues scale',
          eyebrow: 'Scales · Lesson 5',
          body: `
<p>The <strong>blues scale</strong> is the minor pentatonic with one extra note added: the <strong>♭5</strong>, often called the "blue note". This chromatic passing tone gives the scale its gritty, vocal tension.</p>
<p>A blues scale = <strong>A C D E♭ E G</strong> — six notes:</p>
[[scale:A:blues]]
<p>The blue note is rarely landed on; it is brushed through on the way between the 4th and 5th. Bend into it, slide off it, and you get that classic crying blues phrasing.</p>`,
          takeaways: [
            'Blues scale = minor pentatonic + ♭5 ("blue note").',
            'A blues: A C D E♭ E G.',
            'Treat the ♭5 as a passing tone, not a resting note.'
          ]
        },
        {
          title: 'Scale patterns across the fretboard',
          eyebrow: 'Scales · Lesson 6',
          body: `
<p>A scale exists everywhere on the neck, but we learn it in <strong>movable boxes</strong> — finger patterns that cover a few frets at a time. The five pentatonic boxes interlock to cover the entire fretboard.</p>
<h3>Connect, don't isolate</h3>
<p>Most players start with pentatonic "box 1", rooted on the 6th string. The goal is to link adjacent boxes so you can flow across the neck instead of being trapped in one position.</p>
<p>Practise three ways: (1) ascend and descend each box cleanly, (2) shift between two neighbouring boxes on a single string, (3) play the same lick in every box. Patterns become music once you can move freely between them.</p>
[[scale:G:pentatonic minor]]`,
          takeaways: [
            'Scales are learned as movable boxes covering a few frets.',
            'The five pentatonic boxes interlock across the whole neck.',
            'Practise linking adjacent boxes, not just isolated shapes.'
          ]
        }
      ]
    },
    {
      id: 'chords',
      name: 'Chords',
      lessons: [
        {
          title: 'What is a chord — triads explained',
          eyebrow: 'Chords · Lesson 1',
          body: `
<p>A <strong>chord</strong> is three or more notes sounded together. The most basic chord is the <strong>triad</strong>: three notes stacked in thirds — a <strong>root</strong>, a <strong>third</strong> and a <strong>fifth</strong>.</p>
<p>Take the major scale and pick every other note from the root: C (1), E (3), G (5). That is a C major triad. Stack thirds from any scale degree and you get that key's chords.</p>
[[chord:C:maj]]
<p>The root names the chord, the third decides major or minor, and the fifth adds stability. Master triads and every bigger chord becomes "a triad plus extras".</p>`,
          takeaways: [
            'A triad is three notes: root, third and fifth.',
            'Build it by stacking thirds from a scale (1-3-5).',
            'Bigger chords are triads with notes added on top.'
          ]
        },
        {
          title: 'Major and minor chords',
          eyebrow: 'Chords · Lesson 2',
          body: `
<p>The difference between a major and a minor chord is a single note: the <strong>third</strong>.</p>
<ul>
<li><strong>Major triad</strong> = root + <strong>major third</strong> (4 semitones) + perfect fifth (7). Bright, happy.</li>
<li><strong>Minor triad</strong> = root + <strong>minor third</strong> (3 semitones) + perfect fifth (7). Dark, sad.</li>
</ul>
<p>Compare C major (C E G) with C minor (C E♭ G). Only the middle note moves down one fret, yet the whole mood flips.</p>
[[chord:A:min]]
<p>On guitar, that one-finger difference is why moving between an open E and Em, or A and Am, is so easy — you are just lifting or adding the third.</p>`,
          takeaways: [
            'The third alone decides major vs minor.',
            'Major third = 4 semitones; minor third = 3 semitones.',
            'Lowering the third by one fret turns major into minor.'
          ]
        },
        {
          title: 'Diminished and augmented',
          eyebrow: 'Chords · Lesson 3',
          body: `
<p>Beyond major and minor, two more triads alter the <strong>fifth</strong> to create tension.</p>
<ul>
<li><strong>Diminished</strong> = root + minor third + <strong>diminished fifth</strong> (♭5). Two minor thirds stacked. Tense, unstable, wants to resolve.</li>
<li><strong>Augmented</strong> = root + major third + <strong>augmented fifth</strong> (♯5). Two major thirds stacked. Dreamlike, suspended.</li>
</ul>
[[chord:B:dim]]
<p>Diminished chords appear naturally on the 7th degree of a major key (B° in C major) and pull strongly back to the tonic. Augmented chords are rarer, used as colourful passing chords.</p>`,
          takeaways: [
            'Diminished = minor third + ♭5 (two stacked minor thirds).',
            'Augmented = major third + ♯5 (two stacked major thirds).',
            'Both are tense chords that want to resolve.'
          ]
        },
        {
          title: '7th chords',
          eyebrow: 'Chords · Lesson 4',
          body: `
<p>Add a fourth note — a <strong>seventh</strong> above the root — to a triad and you get a richer, jazzier chord. Three common flavours:</p>
<ul>
<li><strong>Dominant 7 (e.g. G7):</strong> major triad + ♭7. Bluesy, restless, the engine of resolution.</li>
<li><strong>Major 7 (e.g. Cmaj7):</strong> major triad + major 7. Lush and dreamy.</li>
<li><strong>Minor 7 (e.g. Am7):</strong> minor triad + ♭7. Smooth and mellow.</li>
</ul>
[[chord:G:7]]
<p>The dominant 7 is special: its tense tritone (between the 3rd and ♭7) drives the strong V→I cadence at the heart of countless songs.</p>`,
          takeaways: [
            'A 7th chord is a triad plus a seventh.',
            'Dom7 = major + ♭7; maj7 = major + 7; min7 = minor + ♭7.',
            'The dominant 7 creates pull toward the tonic.'
          ]
        },
        {
          title: 'Barre chords',
          eyebrow: 'Chords · Lesson 5',
          body: `
<p><strong>Barre chords</strong> turn open-chord shapes into <strong>movable</strong> shapes by using one finger as a "bar" across all six strings — a movable nut.</p>
<h3>The two essential shapes</h3>
<ul>
<li><strong>E-shape (root on 6th string):</strong> barre an E or Em shape. At the 1st fret it is F / Fm; slide it up for any root.</li>
<li><strong>A-shape (root on 5th string):</strong> barre an A or Am shape. At the 2nd fret it is B / Bm.</li>
</ul>
[[chord:F:maj]]
<p>Find the root note under your index finger and you instantly know the chord's name anywhere on the neck. Two shapes × twelve frets = every major and minor chord.</p>`,
          takeaways: [
            'A barre finger acts as a movable nut.',
            'E-shape roots on the 6th string; A-shape on the 5th.',
            'Locate the root to name the chord at any fret.'
          ]
        },
        {
          title: 'The CAGED system',
          eyebrow: 'Chords · Lesson 6',
          body: `
<p><strong>CAGED</strong> is a framework that maps the whole neck using five open-chord shapes: <strong>C, A, G, E and D</strong>. Any chord can be played in five positions, one per shape.</p>
<p>The shapes connect in that order up the neck. A C chord, for instance, can be played as the open C shape, then an A shape, a G shape, an E shape and a D shape — each rooted higher, all sounding C.</p>
<h3>Why it matters</h3>
<p>CAGED links chords, arpeggios and scales to the same five visual anchors, so a single shape unlocks chord voicings, the notes around them, and the matching scale pattern. It is the bridge between rhythm and lead playing.</p>`,
          takeaways: [
            'CAGED uses five shapes — C A G E D — to cover the neck.',
            'Any chord can be played in five connected positions.',
            'The shapes tie together chords, arpeggios and scales.'
          ]
        },
        {
          title: 'Chord inversions',
          eyebrow: 'Chords · Lesson 7',
          body: `
<p>An <strong>inversion</strong> is a chord with a note other than the root in the bass. The notes are the same; their order changes — and so does the colour and the bass line.</p>
<ul>
<li><strong>Root position:</strong> root in the bass (C E G).</li>
<li><strong>1st inversion:</strong> third in the bass (E G C) — written C/E.</li>
<li><strong>2nd inversion:</strong> fifth in the bass (G C E) — written C/G.</li>
</ul>
<p>Inversions let you write smooth bass lines, voice-lead between chords with minimal movement, and avoid big jumps. That "/" notation (a "slash chord") tells you exactly which bass note to play.</p>`,
          takeaways: [
            'An inversion puts a non-root chord tone in the bass.',
            '1st inversion = third in bass; 2nd = fifth in bass.',
            'Slash chords (C/E) name the chord and its bass note.'
          ]
        }
      ]
    },
    {
      id: 'intervals',
      name: 'Intervals',
      lessons: [
        {
          title: 'What is an interval',
          eyebrow: 'Intervals · Lesson 1',
          body: `
<p>An <strong>interval</strong> is the distance in pitch between two notes. Intervals are the raw material of melody (notes in sequence) and harmony (notes together). Every scale and chord is just a particular collection of intervals.</p>
<p>Each interval has a <strong>number</strong> (how many letter names it spans) and a <strong>quality</strong> (major, minor, perfect, etc.). From C to E spans C-D-E = a third; because it is four semitones it is a <em>major</em> third.</p>
<p>Train your ear to recognise intervals and you can work out melodies, harmonise on the fly, and understand why chords sound the way they do.</p>`,
          takeaways: [
            'An interval is the distance between two pitches.',
            'It has a number (letters spanned) and a quality.',
            'Intervals are the building blocks of scales and chords.'
          ]
        },
        {
          title: 'Half steps and whole steps',
          eyebrow: 'Intervals · Lesson 2',
          body: `
<p>The two smallest intervals are the foundation of every scale:</p>
<ul>
<li><strong>Half step (semitone):</strong> the smallest distance — one fret. C to C♯, or E to F.</li>
<li><strong>Whole step (tone):</strong> two semitones — two frets. C to D, or F to G.</li>
</ul>
<p>On guitar this is beautifully literal: one fret = a half step, two frets = a whole step, on every string. The scale patterns you learned (W-W-H-W-W-W-H for major) are simply recipes of these two intervals.</p>`,
          takeaways: [
            'Half step = one fret (semitone).',
            'Whole step = two frets (tone).',
            'Scale formulas are just sequences of half and whole steps.'
          ]
        },
        {
          title: 'Interval names — unison to octave',
          eyebrow: 'Intervals · Lesson 3',
          body: `
<p>Within one octave there are twelve interval sizes, each with a name. Measured in semitones from the root:</p>
<ul>
<li>0 – Unison · 1 – Minor 2nd · 2 – Major 2nd · 3 – Minor 3rd</li>
<li>4 – Major 3rd · 5 – Perfect 4th · 6 – Tritone (♭5/♯4)</li>
<li>7 – Perfect 5th · 8 – Minor 6th · 9 – Major 6th</li>
<li>10 – Minor 7th · 11 – Major 7th · 12 – Octave</li>
</ul>
<p><strong>Perfect</strong> intervals (4th, 5th, octave) sound stable and open. <strong>Major/minor</strong> intervals (2nds, 3rds, 6ths, 7ths) come in a brighter and a darker version one semitone apart.</p>`,
          takeaways: [
            'There are twelve named intervals within an octave.',
            '4ths, 5ths and the octave are "perfect" and stable.',
            '2nds, 3rds, 6ths, 7ths each have a major and minor form.'
          ]
        },
        {
          title: 'Consonance and dissonance',
          eyebrow: 'Intervals · Lesson 4',
          body: `
<p>Intervals sit on a spectrum from <strong>consonant</strong> (restful, pleasant) to <strong>dissonant</strong> (tense, wanting to move).</p>
<ul>
<li><strong>Most consonant:</strong> unison, octave, perfect 5th, perfect 4th.</li>
<li><strong>Mildly consonant:</strong> major and minor 3rds and 6ths — the sweetness behind chords.</li>
<li><strong>Dissonant:</strong> 2nds, 7ths and especially the <strong>tritone</strong> — the most unstable interval, historically nicknamed "the devil in music".</li>
</ul>
<p>Dissonance is not "bad" — it is the tension that makes resolution satisfying. Great music constantly moves between the two.</p>`,
          takeaways: [
            'Intervals range from consonant (restful) to dissonant (tense).',
            'Octaves, 5ths and 4ths are the most consonant; 3rds/6ths are sweet.',
            'Dissonance creates the tension that resolution releases.'
          ]
        },
        {
          title: 'Recognising intervals on the fretboard',
          eyebrow: 'Intervals · Lesson 5',
          body: `
<p>Because the guitar is symmetrical, every interval has a repeatable <strong>shape</strong>. Learn the shape once and you can spot or play that interval anywhere.</p>
<ul>
<li><strong>Octave:</strong> up two strings, across two frets (6th→4th, 5th→3rd).</li>
<li><strong>Perfect 5th:</strong> up one string, across two frets.</li>
<li><strong>Perfect 4th:</strong> straight across — same fret, next string up (except across the G–B pair).</li>
<li><strong>Major 3rd:</strong> up one string, back one fret.</li>
</ul>
<p>These shapes shift by one fret whenever they cross the B string, because of its different tuning. Internalise the shapes and the fretboard turns into a map of relationships, not isolated dots.</p>`,
          takeaways: [
            'Every interval has a movable shape on the neck.',
            'Octave = 2 strings / 2 frets; 5th = 1 string / 2 frets.',
            'Shapes shift one fret when they cross the B string.'
          ]
        }
      ]
    },
    {
      id: 'modes',
      name: 'Modes',
      lessons: [
        {
          title: 'What are modes — the parent scale relationship',
          eyebrow: 'Modes · Lesson 1',
          body: `
<p>A <strong>mode</strong> is a scale created by starting and ending on a different degree of a "parent" scale. Play the notes of C major but treat <strong>D</strong> as home, and you get D Dorian — same seven notes, a new tonal centre and a new mood.</p>
<p>The seven modes of the major scale, in order, are: <strong>Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian</strong> — built on the 1st through 7th degrees.</p>
<p>The trick is that the parent scale's notes never change; what changes is which note your music gravitates toward. That shifting "home" is what gives each mode its character.</p>`,
          takeaways: [
            'A mode starts on a different degree of a parent scale.',
            'The seven modes run Ionian through Locrian.',
            'Same notes, different tonal centre, different mood.'
          ]
        },
        {
          title: 'Ionian and Dorian',
          eyebrow: 'Modes · Lesson 2',
          body: `
<p><strong>Ionian</strong> is simply the major scale — the 1st mode, bright and resolved. It is your reference point for hearing how the others differ.</p>
[[scale:C:major]]
<p><strong>Dorian</strong> is the 2nd mode: a minor scale with one twist — a <strong>raised 6th</strong> compared to natural minor. That major 6th gives Dorian a hopeful, jazzy, less-sad minor sound. D Dorian uses the notes of C major but centres on D.</p>
[[scale:D:dorian]]`,
          takeaways: [
            'Ionian is the major scale itself (mode 1).',
            'Dorian is a minor mode with a raised 6th.',
            'That natural 6th gives Dorian its hopeful, jazzy colour.'
          ]
        },
        {
          title: 'Phrygian and Lydian',
          eyebrow: 'Modes · Lesson 3',
          body: `
<p><strong>Phrygian</strong> (3rd mode) is a minor scale with a <strong>flattened 2nd</strong>. That semitone right above the root gives a dark, Spanish, flamenco-tinged tension. E Phrygian draws from C major, centred on E.</p>
[[scale:E:phrygian]]
<p><strong>Lydian</strong> (4th mode) is a major scale with a <strong>raised 4th</strong>. That ♯4 floats and shimmers — a dreamy, cinematic brightness. F Lydian uses C major's notes, centred on F.</p>
[[scale:F:lydian]]`,
          takeaways: [
            'Phrygian is minor with a ♭2 — dark and Spanish.',
            'Lydian is major with a ♯4 — dreamy and floating.',
            'Each mode is defined by one or two altered degrees.'
          ]
        },
        {
          title: 'Mixolydian and Aeolian',
          eyebrow: 'Modes · Lesson 4',
          body: `
<p><strong>Mixolydian</strong> (5th mode) is a major scale with a <strong>flattened 7th</strong>. It keeps a major, upbeat feel but with a bluesy, dominant edge — the sound of countless rock and blues riffs. G Mixolydian draws from C major.</p>
[[scale:G:mixolydian]]
<p><strong>Aeolian</strong> (6th mode) <em>is</em> the natural minor scale — dark and melancholic. A Aeolian and A natural minor are the same thing, the relative minor of C major.</p>
[[scale:A:aeolian]]`,
          takeaways: [
            'Mixolydian is major with a ♭7 — bluesy and dominant.',
            'Aeolian is identical to the natural minor scale.',
            'Both are everyday modes in rock, blues and pop.'
          ]
        },
        {
          title: 'Locrian',
          eyebrow: 'Modes · Lesson 5',
          body: `
<p><strong>Locrian</strong> (7th mode) is the rarest and most unstable mode. It is a minor scale with both a <strong>flattened 2nd</strong> and a <strong>flattened 5th</strong>.</p>
[[scale:B:locrian]]
<p>That diminished 5th means the tonic chord is itself a diminished triad — there is no solid "home" to rest on, which is why Locrian rarely anchors a whole piece. You will meet it most often over a single half-diminished chord in jazz, or for deliberately uneasy, dark passages in metal.</p>`,
          takeaways: [
            'Locrian is minor with a ♭2 and a ♭5.',
            'Its tonic is a diminished chord — no stable home.',
            'Used mostly over half-diminished chords and for dark colour.'
          ]
        },
        {
          title: 'Using modes practically — modal chord progressions',
          eyebrow: 'Modes · Lesson 6',
          body: `
<p>Modes only come alive when the <strong>harmony</strong> supports them. Soloing C-major shapes over a C chord just sounds like C major — to hear Dorian you need a progression that makes D feel like home.</p>
<h3>How to make a mode stick</h3>
<ul>
<li><strong>Pedal the root:</strong> stay on or return to the mode's tonic chord so the ear accepts it as home.</li>
<li><strong>Feature the characteristic note:</strong> Dorian's natural 6th, Lydian's ♯4, Mixolydian's ♭7 — lean on the note that makes the mode unique.</li>
<li><strong>Use the mode's own chords:</strong> e.g. D Dorian thrives over a Dm–G vamp; G Mixolydian over G–F.</li>
</ul>
<p>Think of modes not as new scales to memorise, but as the major scale viewed from a different home, with one or two colour notes you deliberately spotlight.</p>`,
          takeaways: [
            'A mode needs harmony that establishes its tonic as home.',
            'Spotlight the characteristic note that defines the mode.',
            'Use modal vamps (e.g. Dm–G for Dorian) to lock the sound in.'
          ]
        }
      ]
    }
  ];

  // assign ids: sectionId_index
  sections.forEach((sec) => {
    sec.lessons.forEach((l, i) => {
      l.id = sec.id + '_' + i;
      l.sectionId = sec.id;
      l.index = i;
    });
  });

  function allLessons() {
    const out = [];
    sections.forEach((s) => s.lessons.forEach((l) => out.push(l)));
    return out;
  }

  window.Lessons = { sections, allLessons, totalCount: allLessons().length };
})();
