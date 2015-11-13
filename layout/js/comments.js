(function($){
    var inputArea = $('#new-comment'),
        postBtn   = $('.comments-new-comment-submit'),
        user_email = localStorage.getItem('login_email');


    //сохраняем данные пользователя для логина
    if (user_email) {
      loginSuccess();
    }

    //события на textarea - отслеживаем ввод
    inputArea.on('keyup', function(e) {
        var checklength = $(this).val().length;
        if(checklength) {
            $(this).css('border', '');
            postBtn.css('opacity', '1');
        }
    });
    
    //рендерим наш шаблон и подгружаем его в дерево комментариев
    postBtn.on('click', function(e) {
        e.preventDefault();

        var msg = $.trim(inputArea.val());
        if (user_email && msg) {
            var comment = {
                author: user_email.split("@").shift(),
                author_avatar: 'avatar-default-man.png',
                text: msg,
                time: new Date().toLocaleDateString('ru-RU')
            };
            var commentRendered = renderCommentTpl(comment);
            $('.comments-content').append(commentRendered);
            inputArea.val('');
            $('header').html('<p>Your comment has been added successfully<span class="close-notification">X</span><p>')
                       .addClass('comment-added');
            setTimeout(function(){
                $('header').removeClass('comment-added').html('');
            }, 2000);
        } else if (!msg) {
            inputArea.css('border', '1px solid #ed2d2d');
        } else {
            alert('Login, please!');
        }
        
    });

    //закрываем по клику на крестик оповещение о добавленном комментарии
    $('header').on('click', '.close-notification', function() {
      $('header').removeClass('comment-added').html('');
    });

    //обработка логина по email
    $('.comments-login-submit').click(function(event) {
      event.preventDefault();
      var email = $('.comments-login-email').val();
      if (validateEmail(email)) {
        loginSuccess();
        localStorage.setItem('login_email', email);

      }
    });

    //обработчик успешного логина
    function loginSuccess() {
      $('.comments-login>form').hide();
      $('.comments-login').append('<a href="" class="comments-login-success">Notify me of new comments</a>');
      postBtn.removeAttr('title').css('cursor', 'pointer');
    }

    //рендеринг handlebar шаблона
    function renderCommentTpl(comment) {
        var source   = $("#comment-template").html();
        var template = Handlebars.compile(source);
        var context = {
            author: comment.author,
            author_avatar: comment.author_avatar,
            text: comment.text,
            time: comment.time,
            big_text: (comment.text.length > 100)
        };
        var html = template(context);
        // console.log(html, template, comment.author);
        return html;
    }

})(jQuery);