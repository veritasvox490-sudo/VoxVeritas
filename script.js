// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initSmoothScrolling();
    initAnimations();
    initNewsletterForm();
    initContactForm();
    initParallaxEffects();
    initImageGalleries();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        const dropdownMenu = dropdown.querySelector('.dropdown-menu');
        
        dropdown.addEventListener('mouseenter', function() {
            dropdownMenu.style.opacity = '1';
            dropdownMenu.style.visibility = 'visible';
            dropdownMenu.style.transform = 'translateY(0)';
        });
        
        dropdown.addEventListener('mouseleave', function() {
            dropdownMenu.style.opacity = '0';
            dropdownMenu.style.visibility = 'hidden';
            dropdownMenu.style.transform = 'translateY(-10px)';
        });
    });
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.story-card, .about-content, .contact-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add animation classes to CSS
    const style = document.createElement('style');
    style.textContent = `
        .story-card, .about-content, .contact-content {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .navbar.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 80px;
                left: -100%;
                width: 100%;
                height: calc(100vh - 80px);
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: left 0.3s ease;
                z-index: 999;
            }
            
            .nav-menu.active {
                left: 0;
            }
            
            .nav-menu li {
                margin: 1rem 0;
            }
            
            .dropdown-menu {
                position: static;
                opacity: 1;
                visibility: visible;
                transform: none;
                box-shadow: none;
                border: none;
                background: transparent;
                padding: 0;
                margin-top: 0.5rem;
            }
            
            .dropdown-menu li a {
                padding: 0.5rem 1rem;
                color: var(--color-text-light);
            }
        }
    `;
    document.head.appendChild(style);
}

// Newsletter form functionality
function initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Show success message
                showNotification('Thank you for subscribing!', 'success');
                this.reset();
            }
        });
    }
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (name && email && message) {
                // Show success message
                showNotification('Message sent successfully!', 'success');
                this.reset();
            } else {
                showNotification('Please fill in all fields.', 'error');
            }
        });
    }
}

// Parallax effects
function initParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-video, .about-image');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Image gallery functionality
function initImageGalleries() {
    const storyCards = document.querySelectorAll('.story-card');
    const silentPeaksStory = `When Maya first heard of the Silent Peaks she laughed the way city people laugh at maps: fond, dismissive, a little smug. Mountains were for postcards, for weekend warriors who packed thin sleeping bags and grand declarations. Her life had been carefully arranged around two things: her apartment with the one crooked tile in the kitchen and the steady rhythm of the city. She was twenty-three, a barista by day and a student of small, ambitious anxieties by night. Her father had been a different kind of person entirely—always a horizon in his voice—so when he died, the absence felt like unfinished sentences.

Elias had loved the Silent Peaks with a stubbornness that seemed old-fashioned next to the electric hum of Maya’s neighborhoods. When Maya was small he would draw them in the margins of grocery lists—jagged blue lines, a tiny figure at the summit. “One day,” he’d say, tapping the paper like a promise. He never made it there. Maya had not been there when he died; she had missed the funeral in an alley of appointments and excuses. The guilt sat on her like a raincoat she could not shake, heavy with the smell of a life she had stepped away from.

She found his notebook weeks after the funeral, tucked under a stack of unopened bills. Inside were drawings—maps that looked like the routes of constellations, lists of supplies, poems that sometimes decided to be precise and sometimes dissolve into a single line of desperate, careful hope. There was an old ticket stub from a train to a town she had never heard of, and a pressed flower that smelled faintly of rain. On the back page, in a hand that was steady even when his breath had been uneven, he had written a single sentence: If not me, then someone must carry these ashes into the wind.

Maya left the city without a plan. She sold her second guitar and used the money to buy a map thicker than anything she’d owned. She packed boots that pinched at first, a jacket with a hood that made her feel both ridiculous and safe, and Elias’s battered compass, which had a nick along its rim like a secret. The first morning she stepped out of the bus at the mountain town of Harsen, the air tasted like metal and thyme, as if the world had been tempered by altitude. She had the impulse to turn back then and there, to wrap herself in the convenience of trains and coffee, but the notebook had been a kind of summons she could no longer ignore.

Harsen clung to the lower slopes like an honest moth—a small square of painted wood, a market, a couple of hostels that smelled of porridge and old socks. The townspeople gave Maya looks like questions: what does a city girl want here? She learned the language of the place in small ways. A woman in the market taught her to tie a scarf the way that caught the wind and readied her hair. A boy with missing teeth offered directions if she traded a city map for his collection of marbles. People mentioned the Peaks like relatives who did not bother with modern conveniences: reverent, practical, uncanny. They spoke about the wind that kept watch and the stones that remembered footsteps. They told her where the path narrowed and where avalanches had once swallowed a century.

Elias’s spirit—if spirits are as banal as they are strange—arrived in pieces. It would be wrong to say it arrived all at once; it came in small, disorienting proofs. At first it was only the smell: pipe tobacco and cedar, the same scent that used to seep from his coat on Sunday mornings. Maya would close her eyes and for a second the kitchen in their old house would return—coffee ground coarse, the radio soft in the other room. That was enough to make her whole body catch.

Later, late in the first night in Harsen, she woke because someone had been speaking her name—no, not a voice like a person’s, but the way wind can shape itself into a passing word. She sat up, heart knocking like a child against a window, and there at the foot of her bed lay a small stone in the shape of a thumbprint. It was smooth and warm. Maya had not found the stone on the street; it had been placed there. She blinked until the edges of the room came back into focus and told herself what she’d told the barista who worked the early shift: grief makes the mind do strange things.

But the next day, the map Elias had drawn and the one she had bought aligned oddly well. Where the official path wandered, his little lines went straight, as if he had known more about the mountain’s riddles than some of the seasoned guides. Maya followed his lines because it was what had been left to her, but also because they felt like a conversation continued only where two people had once agreed to continue it.

The climb began in a manner that was mostly patient: fields of high grass that leaned against the wind like people on a crowd barrier, granite faces mottled with lichen, the odd cairn that looked like an offering. The first night they camped at the edge of a birch wood. Maya set the small stove to boil, the sound tinny and domestic in the wide silence. She took Elias’s ashes from the discreet velvet pouch she carried in her pack. They were less like what she had imagined and more like a hush—fine, warm particles that glinted when the low light hit them. She thought of how small they seemed for so large a life, and it hurt.

“Elias wanted this,” she whispered, not knowing if it was to the ashes or the dark. The reply slipped into the air like breath tasting salt. “I know,” Elias said, not as a voice but as a belief. It was earnest and particular and more patient than guilt.

The mountain changed how people spoke. The townspeople’s metaphors seemed inadequate—here everything was direct. The wind cut conversations down to honest things. It also rearranged memory. When Maya pressed her hand to a rock and closed her eyes, she could feel the fossiled warmth of feet that had warmed it long ago. The mountain’s timelines overlapped and hummed, and sometimes Elias’s footsteps synchronized with hers, like an echo across seasons.

Climbing alongside the intangible presence of her father was an education in restraint. He did not command. He offered memories the way a guide offers an object: here is what once happened. When a ravine yawned ahead, his presence would be in the forward half of her body—she would remember the way her father steadied her on a swing when she was five. When a cold fog banked in and the path vanished, the memory would narrow to a single lesson: breathe, and breath again.

At night they spoke in catalogues of small things. Elias smelled of rain. He remembered a song she had forgotten. He told her the name of the tiny bird that nested in a rocky crevice (a stone lark, one of the town elders had insisted existed, and it did, stubborn and bright). He sometimes suggested small improvements to her knot-tying, as if he were at her shoulder. These moments were not miraculous as much as they were domestic continuations of a life interrupted: her father tending a mundane detail even after his body had gone.

The climb forced an honesty that she had not expected. The city had been a set of deliberate obfuscations—coffee to wake, drink to numb, work to define self. Here, there was only the immediate problem: a stream to cross, a blister to tend, the need to shelter a tent when the sky decided to throw itself at them. Guilt lost its theatricality and became pragmatic. To atone, she had to do the things that atonement easily forgets: show up, be careful, notice where the path was treacherous and step aside for others.

Halfway up, at a place the maps called Hollow Ridge, they encountered a woman with hair like a white river and eyes black as storm glass. She lived in a hut threaded into the cliff, and the townspeople said she was a keeper of certain mountain truths. She boiled tea that tasted of iron and taught Maya how to tie a prayer into a coin and throw it into the ravine. “You cannot put a grief away,” she said simply, “but you can honor the space it takes.” Maya asked about the spirit who had been walking with her. The woman took a breath as if the answer required climbing itself.

“Spirits come where living people need them,” she said. “Sometimes they are wishes that grew a face. Sometimes they are the sound of a story told so often it learned to speak. Either way, they will go when the task is done—not because they forget, but because the world will no longer need them to carry the question.”

Maya wanted to argue about ghosts like one argues with a photograph, but the mountain was teaching her to leave arguments at the tent entrance. She tucked the tea into her ribs and carried on.

As the altitude increased, the landscape simplified into fewer colors and more textures. Snow grew like a slow, patient animal across ledges. Ice sang when the light touched it. The air had a clarity that made everything look like an offering: the ridges were knives, the sky a cup. The higher they went, the more the mountain refused their impatience. Time retracted to the length of each step.

There was a day when the clouds rolled in like a collective breath. Visibility dropped to the distance of a hand, and the trail turned into a ghost of itself. Maya walked with the compass and with Elias’s notes, but both could be treacherous in fog—lines on paper and a needle on glass meant little to wind’s appetite. That day she nearly fell into a hidden cleft. She remembers the sound of her own socked foot sliding, the sick vertical lurch of stomach. She remembers a hand—not a hand made of bone and stone, but the remembered pressure of her father’s palm on the back of her neck when she had charmed herself into something reckless at fifteen. The pressure steadied her in the way memory does: not physical but entirely effective. Her foot found the edge. She sat down on the snow and laughed once, a sound corrosive and relieved.

“You could have been angry,” Elias said later, in a place where wind and guilt had both grown small. It was a statement, not a question. Maya had to choose between self-reproach and the hard, quiet grief she was allowed. She chose the latter. “I am,” she admitted. “I am so angry I miss it.”

“You’re human,” he said. “I’m not asking for miracles. I’m asking for motion.”

Motion was the currency the mountain recognized. Every step was a tiny repayment. In those steps, she learned that grace isn't always lyric—often it is a practice. She found small mercies: a clear spring where her tongue could taste the mountain’s geology, a ledge that sheltered them from a storm, a fox that watched them with an almost conspiratorial calm. She met other climbers who were doing their own reckonings. There was a man from the north who had come to scatter the ashes of a wife beneath a particular tuft of tundra, and a pair of sisters who were fulfilling a promise to each other. In the way people in transit do, they told stories in quick fragments, and Maya collected them like stones, each one a different density of sorrow and dignity.

The Silent Peaks had traditions that braided the physical and the spiritual. Before the higher passes, they tied strips of cloth to the guardrails—bright scraps that the wind could tug against, each holding a written wish or a name. Maya wrote Elias’s name on one, and as the wind took the strip it seemed to speak with a thousand small voices. There was a practice of leaving a stone with a line carved into it: if you left a mark for someone else to find, you extended the conversation between the living and what had been. Maya left one with her father’s initials and her own, and the stone felt like a small, solid publication of a promise.

On a plateau called the Teeth—so named because the ridge’s serrated silhouette looked like a jaw—Maya met the last of the mountain guides. He was young but not childish, and he wore a scarf Elias had once shown her in a photograph. The guide listened without interrupting and then said, “You’ll reach a place called the Hollow Summit. Wind takes what it will at the rim. If you want to spread ashes, you do it where the world can catch them, where the air is honest.”

They reached the Hollow Summit on a morning when the sky had been scoured clean. The summit did not look like a triumph so much as a particular kind of inevitability: an open lip of stone that led into possibilities. The wind there was not a thing to be negotiated; it was an audience. It arranged sound into reed-like phrases. When Maya stepped to the rim she felt the planet’s architecture change—thinness, exposure, a strange generosity.

She set the pouch upon a flat stone and opened it like someone opening a letter. The ashes were lighter than she had imagined, a fine silver dusk. Elias’s spirit was not visible in the way movies claim ghosts are visible; he did not manifest a body or translucent hands. He was more present in the direction of her attention. She combed her hands through his ashes until they stuck like dust to the ridges of her fingers. She wanted a ritual that might soothe whatever remained: apology, honor, and above all, movement.

“I’m sorry,” she said to the wide air. The words surprised her with their smallness; they were not enough but they were necessary. She had practiced them like a prayer. She thought of the funeral she had missed—of faces in a chapel, of the parishioner’s mouth moving in a mechanical litany—and how meaningless ceremony had felt then. Here, at the lip of the world's throat, the landscape served as a better liturgy.

She scattered Elias’s ashes into the wind. They rose not like a cloud but like a suggestion. They spread into the blue as if each particle had its own intention, and for a while the sky seemed to be composing a sentence with them. They twirled, they settled into the crevices of old snow, they disappeared into pockets of air where the mountain remembers things. Maya watched until the fingers of ash receded into the horizon’s grammar. For a long time she simply watched.

Elias’s presence softened as the wind took the last of the dust. The mountain did not demand that a spirit go; it allowed the world to do the work. “You did well,” he said then—no longer the anxious man who had worried over grocery lists, no longer the father who had been missed by a daughter. It was a statement of fact that had in it the final contour of forgiveness.

Maya felt a quiet she had not expected. It was not the absence of grief—grief lingers like a bruise—but a different dimension of it, a settling. Without the physical need to carry questions, she had room to hold the living. She remembered being small, balancing on the curb as Elias steadied her. She remembered the smell of his coat in the kitchen. She remembered the barista’s laugh in the city, the small betrayals and the larger ones. She let them exist side by side. Grief had been a currency, and she had paid it, clumsily and honestly.

She remained on the summit for a little while, letting the sun draw the shape of the land in thin lines across the snow. The guide offered her a mug of warm tea and a quiet nod. “The mountain does not erase,” he said. “It rearranges.”

On the descent, the world seemed both familiar and new. The path folded into itself with all the ordinary tricks of geography, but there were changes within Maya. She walked differently, carrying not the urgency of guilt but a practiced tenderness. The town of Harsen received her with a kind of private recognition. There were no fanfares—only small, human exchanges: a baker fitting bread into a paper bag, a child giving her a stone for good luck, the keeper of the hut offering an extra slice of bread. The mountain had not given her absolution so much as a new set of muscles for living: the capacity to stay with what was difficult and to honor where memory asked to be honored.

Months later, back in the city, the tile in Maya’s kitchen remained crooked. The apartment was imbued with small mountain things: a strip of cloth wound into the curtain rod, a stone with a carved line on the sill, Elias’s compass now set by the window. She returned to work, to the rituals of espresso shots and semester deadlines, but there was a different cadence to her days. The city no longer felt like a set of exits. It was a terrain to be navigated with care, like the mountain had taught her.

Sometimes, when she woke in the dark, she would still smell cedar and the faint phantom smoke of pipe tobacco. She would sleep with her hand over the compass on her bedside table and feel the faint, residual sense of being accompanied. Not by a ghost that demanded, but by a memory that had become a companion. At times she would open Elias’s notebook and trace the maps, and then—without dramatics—she would add small notes in the margins, a living line to the conversation.

If the Silent Peaks taught her anything, it was that atonement is rarely cinematic. It doesn’t come as a stroke of grand absolution but as a series of small acts: showing up, listening, holding a body in your memory until it stops being a list of what-ifs and becomes a person again. The mountain had asked for motion, and she had given it. In return, the mountain had given her the ability to live beside a grief without letting it define every hour.

Years would pass. Eli’s compass would be placed on a shelf, the needle eventually finding its rest. Maya would visit Harsen sometimes, bringing bread and stories to the people who had once been strangers. She would watch the sky like a reader watches a favorite line. The Silent Peaks would remain, intractable and elegant, as mountains do. They would keep their secrets and their cairns, their wind and their grooves. They would also keep a tiny bit of Elias, tucked into a crevice among the rocks, carried into seasons and remembered in the way moss remembers rain.

On long evenings when the city lay like a sleeping beast and the light fell across the crooked tile in the kitchen, Maya would stand at the window and think of the rim of the Hollow Summit—the place where she had released the ashes, the place where the wind had accepted them. She would feel, precisely and without bluster, the relief of having honored a wish. It was not enough to unmake all regrets, but it rebalanced the ledger in that quiet way the mountain had taught her. The ledger now included the facts of reckoning: that people are allowed to make mistakes, that apologies are small works you perform with your body, and that sometimes love insists you step out of your own life to finish someone else’s reach.

The Silent Peaks stood, as they always had, patient and unsmiling. They had watched countless promises and dozens of small human reconciliations. For Maya, they remained the place where she had learned to be a person who could carry a grief and still move forward—someone who could love a man who was gone without letting that love become a chain. She had fulfilled a wish and, in the doing, had given herself the right to be imperfect and alive.

In the end, the mountain’s last lesson was not about dying well or living perfectly. It was about attention. If you attend to the world—the winds, the stones, the people—then life arranges itself in ways that allow for repair. Maya learned to listen for the small sounds: the cough of a kettle, the rattle of a spoon against a mug, the echo of a voice in an old stone. She learned that letting go sometimes meant letting the world keep a thing for you. And she learned that a promise, once carried to its end, opens up space not to forget but to remember with a softer, truer heart.

The Silent Peaks kept their hush. Maya kept walking. Somewhere between the city and the mountain, the two lives braided into one: a girl who could make coffee with careful hands and who, when the mountains called, would answer with footprints and forgiveness.`;
    
    // Add click handlers for story cards
    storyCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const title = this.querySelector('h3')?.textContent || '';
            if (title.trim().toLowerCase() === 'the silent peaks') {
                openStoryModal('The Silent Peaks', silentPeaksStory);
                e.preventDefault();
                e.stopPropagation();
            }
        });
        const btn = card.querySelector('.btn-text');
        if (btn) {
            btn.addEventListener('click', (e) => {
                const title = card.querySelector('h3')?.textContent || '';
                if (title.trim().toLowerCase() === 'the silent peaks') {
                    openStoryModal('The Silent Peaks', silentPeaksStory);
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--color-white);
            border-left: 4px solid var(--color-gold);
            box-shadow: var(--shadow);
            padding: 1rem;
            border-radius: 4px;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: #28a745;
        }
        
        .notification-error {
            border-left-color: #dc3545;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: var(--color-text-light);
        }
        
        .notification-close:hover {
            color: var(--color-text);
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', function() {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Initialize counter animation when about section is visible
const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            aboutObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    aboutObserver.observe(aboutSection);
}

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations and effects
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Story modal helpers
function openStoryModal(title, bodyText) {
    const modal = document.getElementById('story-modal');
    if (!modal) return;
    const titleEl = modal.querySelector('#story-modal-title');
    const bodyEl = modal.querySelector('.story-modal-body');
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = bodyText;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeStoryModal() {
    const modal = document.getElementById('story-modal');
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;
    if (target.matches('[data-close]')) {
        closeStoryModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeStoryModal();
    }
});
