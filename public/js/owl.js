$('.owl-carousel').owlCarousel(
{
  stagePadding: 0,
  loop: false,
  center: false,
  margin: 10,
  URLhashListener: true,
  autoplayHoverPause: true,
  startPosition: 'URLHash',
  responsive:
  {
    0:
    {
      items: 1
    },
    600:
    {
      items: 2
    },
    1000:
    {
      items: 4
    }
  }
});
