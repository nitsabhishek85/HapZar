app.controller('LoginCtrl', function ($scope, $stateParams, ionicMaterialInk,$timeout) {
    //ionic.material.ink.displayEffect();
    ionicMaterialInk.displayEffect();

    // Toggle Code Wrapper
    var code = document.getElementsByClassName('code-wrapper');
    for (var i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }
    
	$scope.next = function() {
	$ionicSlideBoxDelegate.next();
	};
	$scope.previous = function() {
	$ionicSlideBoxDelegate.previous();
	};

	// Called each time the slide changes
	$scope.slideChanged = function(index) {
	$scope.slideIndex = index;
	};
    
    
    var fab = document.getElementById('fab');
    $scope.moveFab = function(dir) {
        fab.style.display = 'none';
        fab.className = fab.className.replace('button-fab-top-right', '');
        /*fab.className = fab.className.replace('button-fab-top-right', '');
        fab.className = fab.className.replace('button-fab-bottom-left', '');
        fab.className = fab.className.replace('button-fab-bottom-right', '');*/
        fab.className += ' button-fab-' + dir;
        $timeout(function() {
            fab.style.display = 'block';
        }, 800);
    };
    $scope.motionFab = function(type) {
        var shouldAnimate = false;
        var classes = type instanceof Array ? type : [type];
        for (var i = 0; i < classes.length; i++) {
            fab.classList.toggle(classes[i]);
            shouldAnimate = fab.classList.contains(classes[i]);
            if (shouldAnimate) {
                (function(theClass) {
                    $timeout(function() {
                        fab.classList.toggle(theClass);
                    }, 900);
                })(classes[i]);
            }
        }
    };

    
   
      
    
});