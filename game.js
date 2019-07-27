var Game = function() {
    this.time = 0;
    this.sceneMoving = false;
    this.canPlay = false;

    this.lastLostLife = 0;
};
var lives = 3;
var ostrich = document.getElementsByClassName('ostrich-moving')[0];
var x = 40;// set x to 40
var speed = 1;
var pos = Math.trunc((Math.random()*100)%100);
var pos1 = Math.trunc((Math.random()*100)%100);
var pos2= Math.trunc((Math.random()*100)%100);
var pos3 = Math.trunc((Math.random()*100)%100);
var pos4 = Math.trunc((Math.random()*100)%100);

Game.prototype.moveLeft = function() {
	if(x>= 0)
		x -= speed;
	ostrich.style.left = x +"vw";
}

Game.prototype.moveRight = function() {
	if(x <= 90)
		x += speed;
	ostrich.style.left = x +"vw";
}

Game.prototype.startCountingScore = function() {
    this.counter = setInterval(
        function() {
            this.time++;
            $('.result').html('POINTS: ' + this.time);

            addObstacles(this.time);
        }.bind(this),
        1000
    );
};

Game.prototype.startMoving = function() {
    $('.ostrich-standing').addClass('hidden');
    $('.ostrich-moving').removeClass('hidden');
    $('.city-img').css('animation', 'none');
    $('.plastic').css('display', 'block');
    this.sceneMoving = true;

    this.audio = new Audio('./sound/music.mp3');
    this.audio.play();
    this.audio.volume = 0.14;
    this.audio.loop = true;

    setTimeout(function() {
        $('.plastic-1').css('display', 'block');
    }, 4000);

    this.eggInterval = setInterval(function() {
        $('.egg').css('display', 'block');
        setTimeout(function() {
            $('.egg').css('display', 'none');
        }, 6500);
    }, 14000);
};

Game.prototype.jumping = function() {
    if (!$('.ostrich-moving').hasClass('jump')) {
        $('.ostrich-moving').addClass('jump');

        setTimeout(function() {
            $('.ostrich-moving').removeClass('jump');
        }, 1000);
    }
};

Game.prototype.collisionCheck = function() {
    this.collideInterval = setInterval(
        function() {
            var currentTime = new Date().getTime();
            if (currentTime - this.lastLostLife < 1000) {
                return;
            }

            var ostrich = $('.ostrich-moving');
            var plastic = $('.plastic');
			var plastic1 = $('.plastic-1');
			var plastic2 = $('.plastic-2');
            var plastic3 = $('.plastic-3');
			var plastic4 = $('.plastic-4');

            var eggBonus = $('.egg');

			console.log(lives);

            if (collide(ostrich, eggBonus)) {
                this.lastLostLife = currentTime;
                lives++;
                $('.lives').html(lives);
                $('.egg').css('display', 'none');

                this.bonus = new Audio('./sound/bonus.mp3');
                this.bonus.play();
                this.bonus.volume = 0.6;
            }
			if (collide(ostrich, plastic)) {
                this.lastLostLife = currentTime;
                $('.plastic').css('display', 'none')
                setTimeout(
                    function() {
                        $('.ostrich-moving').removeClass('lose-life');

                    }.bind(this),
                    500
                );

            }
			if (collide(ostrich, plastic1)) {
				this.lastLostLife = currentTime;
				$('.plastic-1').css('display', 'none')
                setTimeout(
                    function() {
                        $('.ostrich-moving').removeClass('lose-life');

                    }.bind(this),
                    500
                );
            }
			if (collide(ostrich, plastic2)) {
				this.lastLostLife = currentTime;
				$('.plastic-2').css('display', 'none')
                setTimeout(
                    function() {
                        $('.ostrich-moving').removeClass('lose-life');

                    }.bind(this),
                    500
                );
            }
			if (collide(ostrich, plastic3)) {
				this.lastLostLife = currentTime;
				$('.plastic-3').css('display', 'none')
                setTimeout(
                    function() {
                        $('.ostrich-moving').removeClass('lose-life');

                    }.bind(this),
                    500
                );
            }
			if (collide(ostrich, plastic4)) {
				this.lastLostLife = currentTime;
				$('.plastic-4').css('display', 'none')
                setTimeout(
                    function() {
                        $('.ostrich-moving').removeClass('lose-life');

                    }.bind(this),
                    500
                );
            }
			if (lives <= 0) {
				this.lastLostLife = currentTime;
				this.gameStop();

                // this.failure = new Audio('./sound/life-lost.mp3');
                // this.failure.play();
                // this.failure.volume = 0.2;

			}
        }.bind(this),
        50
    );
};

Game.prototype.gameStop = function() {
    this.canPlay = false;
    this.sceneMoving = false;
    clearInterval(this.collideInterval);
    this.audio.pause();

    $('.ostrich-down').removeClass('hidden');
    $('.ostrich-moving').addClass('hidden');
    $('.city-img').css('animation', 'none');
    $('.plastic').css('display', 'none');
    $('.plastic-1').css('display', 'none');
    $('.plastic-2').css('display', 'none');
    $('.plastic-3').css('display', 'none');
    $('.plastic-4').css('display', 'none');
    $('.egg').css('display', 'none');
    clearInterval(this.eggInterval);

    setTimeout(function() {
        $('.game').css({
            transform: 'translateY(-100%)'
        });

        $('.game-over').css({
            transform: 'translateY(0)'
        });
    }, 2500);

    clearInterval(this.counter);
    $('.final-result').html('POINTS: ' + this.time);

    setTimeout(
        function() {
            this.time = 0;
            $('.result').html('POINTS: ' + this.time);

            lives = 3;
            $('.lives').html(lives);

            $('.ostrich-down').addClass('hidden');
            $('.ostrich-standing').removeClass('hidden');
        }.bind(this),
        3000
    );
};

function collide(objOne, objTwo) {
    var bird = objOne;
    var obstacle = objTwo;

    var birdX = bird.offset().left;
    var birdW = bird.width() - 28;
    var birdY = bird.offset().top;
    var birdH = bird.height() - 5;

    var obstacleX = obstacle.offset().left;
    var obstacleW = obstacle.width();
    var obstacleY = obstacle.offset().top;
    var obstacleH = obstacle.height();

    if (
        birdY + birdH < obstacleY ||
        birdY > obstacleY + obstacleH ||
        birdX > obstacleX + obstacleW ||
        birdX + birdW < obstacleX
    ) {
        return false;
    } else {
        return true;
    }
}

function addObstacles(time) {
    if (time%5 === 3) {

        setTimeout(function() {
			pos = Math.trunc((Math.random()*100)%100);

			$('.ostrich-moving').removeClass('lose-life');
			if($('.plastic').css('display')!=='none') {
				$('.ostrich-moving').addClass('lose-life');
				lives--;
                $('.lives').html(lives);
			}
			$('.plastic').css('right', pos+"vw");
            $('.plastic').css('display', 'block');
        }, 5500);
    } else if (time%10 === 7) {
        setTimeout(function() {
			pos2 = Math.trunc((Math.random()*100)%100);

			if($('.plastic-1').css('display')!=='none') {
				$('.ostrich-moving').addClass('lose-life');
				lives--;
				$('.lives').html(lives);
			}

			$('.plastic-1').css('right', pos2+"vw");
            $('.plastic-1').css('display', 'block');
        }, 1700);
    } else if (time%10 === 9) {
        setTimeout(function() {
			pos2 = Math.trunc((Math.random()*100)%100);

			$('.plastic-2').css('right', pos1+"vw");
            $('.plastic-2').css('display', 'block');
        }, 1700);
    } else if (time%20 === 18) {
        setTimeout(function() {
			pos4 = Math.trunc((Math.random()*100)%100);

			$('.plastic-3').css('right', pos4+"vw");
            $('.plastic-3').css('display', 'block');
        }, 200);
    } else if (time%10 === 4) {
        setTimeout(function() {
			pos3 = Math.trunc((Math.random()*100)%100);

			$('.plastic-4').css('right', pos3+"vw");
            $('.plastic-4').css('display', 'block');
        }, 200);
    }
}
