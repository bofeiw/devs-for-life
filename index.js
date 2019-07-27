$(document).ready(function() {
    var game = new Game();

    $('html, body').animate(
        {
            scrollTop: 0
        },
        10
    );

    $('.btn-start').click(() => {
        setTimeout(function() {
            game.canPlay = true;
        }, 750);

        $('.start-screen').css({
            transform: 'translateY(-100%)'
        });

        $('.game').css({
            transform: 'translateY(0)'
        });
    });

    $('.btn-restart').click(() => {
        setTimeout(function() {
            game.canPlay = true;
        }, 750);

        $('.game').css({
            transform: 'translateY(0)'
        });

        $('.game-over').css({
            transform: 'translateY(100%)'
        });
    });

    $(window).on('keydown', function(evt) {
        if (game.canPlay) {
            switch (evt.which) {
                case 37:
                    // left
                    console.log("left");
                    game.moveLeft();
                    break;
                case 39:
                    // right
                    console.log("right");
                    game.moveRight();
                    break;
                case 32:
                    evt.preventDefault();
                    if (game.sceneMoving) {
                        game.jumping();
                    } else {
                        game.startCountingScore();
                        game.startMoving();
                        game.collisionCheck();
                    }
                    break;
                case 40:
                    //const limitRight = $(window).width();
                    //const x = Math.random() * limitRight;
                    const position = $('.ostrich-moving').position();
                    const x = position.left;
                    const tree = $(`<img alt="tree" src="img/tree.png" class="tree">`);
                    tree.css({left: x});
                    $('#game').append(tree);
                    setTimeout(function () {
                        $('.tree').css('display', 'none');
                    }, 1000);
                    break;
                default:
                    console.log('Unsupported key was pressed.');
            }
        }
    });
});
