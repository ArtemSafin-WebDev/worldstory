import './scss/styles.scss'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { debounce } from 'lodash'
import { TweenMax, Elastic, Power4, Linear } from 'gsap/TweenMax'
const mobileWidth = 760

document.addEventListener('DOMContentLoaded', function() {
  const menuButton = document.querySelector('.nav-panel__menu-button')
  const navPanel = document.querySelector('.nav-panel')
  const mainNav = document.querySelector('.main-nav')
  const overlay = document.querySelector('.overlay')
  let tween
  menuButton.addEventListener('click', function() {
    navPanel.classList.add('expanded')
    overlay.classList.add('shown')
    menuButton.setAttribute('aria-expanded', true)
    tween = new TweenMax.staggerFrom(
      '.main-nav__list-item',
      2,
      {
        scale: 0.5,
        opacity: 0,
        delay: 0.5,
        ease: Power4.easeOut,
        force3D: true
      },
      0.2
    )
    disableBodyScroll(mainNav)
  })
  overlay.addEventListener('click', function() {
    navPanel.classList.remove('expanded')
    overlay.classList.remove('shown')
    menuButton.setAttribute('aria-expanded', false)
    console.log(tween)
    tween.pause(0)
    enableBodyScroll(mainNav)
  })

  window.addEventListener(
    'resize',
    debounce(() => {
      if (window.innerWidth > mobileWidth) {
        navPanel.classList.remove('expanded')
        overlay.classList.remove('shown')
        menuButton.setAttribute('aria-expanded', false)
        enableBodyScroll(mainNav)
      }
    }, 200)
  )
})
