$(document).ready(function() {

    //хедер при скролле будем оставлять наверху
    var sticky = $('header'),
        stickyOffset = $('header').offset().top;

    $(window).scroll(function(){
      var scroll = $(window).scrollTop();

      if (scroll >= stickyOffset) sticky.addClass('fixed');
      if (scroll === 0) sticky.removeClass('fixed');
    });

    //кастомные тултипы
    $('.tooltip').tooltipster();
    
    //блок под иконки share - по hover отрабатывает значительно хуже, поэтому
    //было решено повесить на клик
    $('.author-articles-article').on('click', '.share>a', function(event) {
      event.preventDefault();

      showShareBlock($(this)[0], "right-out");
      $('.share-block').toggle('400');
    });
    
    //подписка
    $('.subscription-submit').click(function(event) {
      event.preventDefault();
      var email = $('.subscription-mail').val();
      if (validateEmail(email)) {
        $('.subscription-wrapper>.container').html('<div class="subscription"><h2>Thank you!</h2><p class="success">You have successfully subscribed to our blog.</p></div>');
      } else {
        $('.subscription-error').show();
      }
    });
    


});


//Данная валидация безусловно не претендует на совершенство - это лишь один из способов провести
//базовую валидацию перед отправкой данных на сервер и повторной проверки там
//кроме того она не учитывает RFC822 и unicode
//но для тестового примера этого должно хватить
function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}