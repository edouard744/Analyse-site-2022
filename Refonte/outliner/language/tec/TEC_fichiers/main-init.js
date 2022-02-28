const COMPONENTS = [
  {
    el: '.js-dropdown',
    id: 'Dropdown',
  },
  {
    el: '.js-tooltip',
    id: 'Tooltip',
  },
  {
    el: '.js-hero',
    id: 'Hero',
  },
  {
    el: '.js-form',
    id: 'Form',
  },
  {
    el: '.js-tabs',
    id: 'Tabs',
  },
  {
    el: '.js-info-carousel',
    id: 'InfoCarousel',
  },
  {
    el: '.js-mobile-slider',
    id: 'MobileSlider',
  },
  {
    el: '.js-slider',
    id: 'Slider',
  },
  {
    el: '.js-opening-content',
    id: 'OpeningContent',
  },
  {
    el: '.js-journey-detail-popup',
    id: 'JourneyDetailPopup',
  },
  {
    el: '.js-disturbance-slider',
    id: 'DisturbanceSlider',
  },
  {
    el: '.js-folding-content',
    id: 'FoldingContent',
  },
  {
    el: '.js-select',
    id: 'Select',
  },
  {
    el: '.js-datetime-select',
    id: 'DatetimeSelect',
  },
  {
    el: '.js-advanced-research-toggler',
    id: 'AdvancedResearch',
  },
  {
    el: '.js-aside-sticky',
    id: 'AsideSticky',
  },
  {
    el: '.js-move-partners',
    id: 'MovePartnersSlider',
  },
  {
    el: '.js-gallery',
    id: 'Gallery',
  },
  {
    el: '.js-time-input',
    id: 'TimeInput',
  },
  {
    el: '.js-date-input',
    id: 'DateInput',
  },
  {
    el: '.js-birthdate-input',
    id: 'BirthdateInput',
  },
  {
    el: '.js-calendar-input',
    id: 'Calendar',
  },
  {
    el: '.js-visibility-toggler',
    id: 'VisibilityToggler',
  },
  {
    el: '.js-fares-grid',
    id: 'FaresGrid',
  },
  {
    el: '.js-country-selector',
    id: 'CountrySelector',
  },
  {
    el: '.js-field-clear',
    id: 'ClearField',
  },
  {
    el: '.js-cards-background',
    id: 'CardsBackground'
  },
  {
    el: '.js-flowchart',
    id: 'Flowchart'
  },
  {
    el: '.js-sticky-sidebar',
    id: 'StickySide'
  },
  {
    el: '.js-sortable-items',
    id: 'SortableItems'
  },
  {
    el: '.js-video',
    id: 'Video'
  },
  {
    el: '.js-promo-slider',
    id: 'VideoSlider'
  },
  {
    el: '.js-lightbox',
    id: 'Lightbox'
  }
  // ,{
  //   el: '.js-redirect-depending-os',
  //   id: 'RedirectDependingOS'
  // }
];


// JPDB 
//    Ce code est commenté parce qu'il n'est pas compatible avec les chargements de page asynchrone du CMS.
//    Il est cependant utile s'il est question de faire des modifications au sein de ce projet
// $(function() {
//   COMPONENTS.forEach(function(component) {
//     requestAnimationFrame(function() {

//       $(component.el).each(function(i, el) {
//         const $el = $(el);
//         const instance = new window.components[component.id]({ el: $el });
//         instance.init();
//       });
//     });
//   });
// });
