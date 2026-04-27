import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    // Register GSAP plugins only in browser
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initAnimations();
    }
  }

  private initAnimations(): void {
    // Hero section animations
    gsap.from('.hero-badge', {
      opacity: 0,
      y: -30,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.hero-title', {
      opacity: 0,
      y: 50,
      duration: 1,
      delay: 0.3,
      ease: 'power3.out',
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out',
    });

    // Hero image container animation
    gsap.from('.hero-image-container', {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      delay: 0.7,
      ease: 'power3.out',
    });

    // Start journey button animation
    gsap.from('.start-journey-btn', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      delay: 1,
      ease: 'back.out(1.7)',
    });

    // Floating animation for the button
    gsap.to('.start-journey-btn', {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1.5,
    });

    // Colored strips animation
    gsap.from('.strip-1', {
      x: -200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: '.strip-1',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from('.strip-2', {
      x: 200,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: '.strip-2',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Services section animations
    gsap.from('.services-header', {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: '.services-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Service cards stagger animation
    gsap.from('.service-card', {
      opacity: 0,
      y: 80,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.service-cards-container',
        start: 'top 70%',
        toggleActions: 'play none none reverse',
      },
    });

    // Solutions section animations
    gsap.from('.solutions-header', {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      scrollTrigger: {
        trigger: '.solutions-header',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Solution cards animation
    gsap.from('.solution-card', {
      opacity: 0,
      y: 60,
      duration: 0.8,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.solution-cards',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Stats section animations
    gsap.from('.stats-badge', {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from('.stats-title', {
      opacity: 0,
      y: 40,
      duration: 1,
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Stats card with scale animation
    gsap.from('.stats-card', {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '.stats-card',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Individual stat items
    gsap.from('.stat-item', {
      opacity: 0,
      scale: 0.8,
      duration: 0.6,
      stagger: 0.2,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.stats-card',
        start: 'top 75%',
        toggleActions: 'play none none reverse',
      },
    });

    // Avatar images floating animation
    const avatars = document.querySelectorAll('.avatar-float');
    avatars.forEach((avatar, index) => {
      gsap.to(avatar, {
        y: -15,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: index * 0.2,
      });
    });

    // CTA section animation
    gsap.from('.cta-section', {
      opacity: 0,
      y: 60,
      duration: 1,
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Add hover animations for cards
    const cards = document.querySelectorAll('.service-card, .solution-card');
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    });
  }
}
