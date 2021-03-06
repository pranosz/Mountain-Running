/*
* mainPageController 
*/
mrApp.controller('mainPageCtrl', ['$scope', 'competitions', function ($scope,competitions) {

	/*
	* This data are used in filter (multiSelectFilter) and represents
	* value attribute of each option.
 	* It's a default sets whitch have influance only for 
 	* the filter when the page is loaded for the first time. 
 	* After that the data are loaded to the filter from multiselect dropdown list. 
 	* If you want for example to unselect one of the option, you must remove correct  
 	* data from array and cancel "selected" attribute in proper option. 
	*/
	$scope.selectCountry = ["poland","austria","croatia","slovakia"];
    $scope.selectCategory = ["alpejski","anglosaski","długi","ultra"];

    /*
    * Hide / show additional filters
    */
	$scope.toggle = false;
    $scope.showFilters = function() {
        $scope.toggle = !$scope.toggle;  
    };
    /*
    * Default date in the date range fields
    */
	$scope.min = {date: moment().locale("en")};
	$scope.max = {date: moment().locale("en").add(12, 'month')};
	/*
   	* Multi select setup
   	*/
    $('#country').multiselect({
        selectAll: true,
        minHeight: null,
        showCheckbox: true,
        texts    : {
            placeholder: 'Select Country',
            search     : 'Search States'
        }
    });
    $('#category').multiselect({
        selectAll: true,
        minHeight: null,
        showCheckbox: true,
        texts    : {
            placeholder: 'Select Category',
            search     : 'Search States'
        }
    });
    /*
    *	items / contains competition objects.
    *	currentPage / default current page set. 
    *	pageSize / how many items(competition) are shown per page. Default set. 
    *	filtered / contains filtered items(competition).
    *	numOfPages / number of pages.	  
    */
	$scope.items = {};
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.filtered = [];
    $scope.numOfPages = [];

    /*
    *	_calculatePages / calculates how many pages we will get, using pageSize parameter.
    *					  This calculation are do on filtered array.  
    */
    var _calculatePages = function(){
		var temp = []; 
		if($scope.filtered.length>1){
			for(var i=0;i<(Math.ceil($scope.filtered.length/$scope.pageSize));i++){
				temp.push({
					name: i+1,
					num: i+1,
				}); 
			}
		}
		return temp;
	};
	$scope.numOfPages = _calculatePages();

	/*
	*	This functionality automatically update filtered array when items are filtered 
	*	and calls _calculatePages function to update number of pages.
	*/
	$scope.$watch("items | multiSelectFilter:selectCountry:'country' | filter:{header:cName} | rangeFilter:min:max | multiSelectFilter:selectCategory:'category'", function(newVal) {
    	$scope.filtered = newVal;
    	$scope.numOfPages = _calculatePages();
    }, true);


    competitions.getCompetitions(function(competitions){
    	$scope.items = competitions.data;
    });

    /*
    * Temp data
    */
    /*
	$scope.items = [
				{
					header:"Bieg im. Franciszka Marduły",
					distance:32,
					up:2205,
					down:2205,
					priceMin:70,
					priceMax:120,
					location:"Krościenko nad Dunajcem",
					date:1528002000000,
					category:"Alpejski",
					pointsUTMB:1,
					pointsBUGT:6,
					timeLimit:8,
					playersLimit:300,
					country:"Austria",
					www:"http://wp.pl",
					signup:"http://wp.pl/poczta"
				},
				{
					header:"Biegi w Szczawnicy: Wielka Prehyba",
					distance:43,
					up:1735,
					down:1735,
					priceMin:30,
					priceMax:150,
					location:"Krościenko nad Dunajcem",
					date:1522738800000,
					category:"długi",
					pointsUTMB:0,
					pointsBUGT:0,
					timeLimit:7,
					playersLimit:350,
					country:"Poland",
					www:"http://www.wp.pl",
					signup:"http://www.wp.pl/poczta"
				},
				{
					header:"Biegi w Szczawnicy: Durbaszka",
					distance:20,
					up:800,
					down:800,
					priceMin:30,
					priceMax:150,
					location:"Krościenko nad Dunajcem",
					date:1522738800000,
					category:"długi",
					pointsUTMB:0,
					pointsBUGT:0,
					timeLimit:7,
					playersLimit:350,
					country:"Poland",
					www:"http://www.wp.pl",
					signup:"http://www.wp.pl/poczta"
				},
				{
					header:"Biegi w Szczawnicy: Hardy Roling",
					distance:7,
					up:400,
					down:400,
					priceMin:20,
					priceMax:100,
					location:"Krościenko nad Dunajcem",
					date:1522738800000,
					category:"długi",
					pointsUTMB:0,
					pointsBUGT:0,
					timeLimit:2,
					playersLimit:330,
					country:"Poland",
					www:"http://www.wp.pl",
					signup:"http://www.wp.pl/poczta"
				},
				{
					header:"XRUN: Mogielica",
					distance:32,
					up:1400,
					down:1400,
					priceMin:40,
					priceMax:80,
					location:"Jurków",
					date:1522738800000,
					category:"długi",
					pointsUTMB:0,
					pointsBUGT:0,
					timeLimit:5,
					playersLimit:300,
					country:"Poland",
					www:"http://www.wp.pl",
					signup:"http://www.wp.pl/poczta"
				},
				{
					header:"Bieg 101",
					distance:101,
					up:1400,
					down:1400,
					priceMin:40,
					priceMax:80,
					location:"Jurków",
					date:1522738800000,
					category:"długi",
					pointsUTMB:0,
					pointsBUGT:0,
					timeLimit:5,
					playersLimit:300,
					country:"Poland",
					www:"http://www.wp.pl",
					signup:"http://www.wp.pl/poczta"
				},
				{
					header:"Bieg 7",
					distance:7,
					up:1400,
					down:1400,
					priceMin:40,
					priceMax:80,
					location:"Jurków",
					date:1522738800000,
					category:"długi",
					pointsUTMB:0,
					pointsBUGT:0,
					timeLimit:5,
					playersLimit:300,
					country:"Poland",
					www:"http://www.wp.pl",
					signup:"http://www.wp.pl/poczta"
				},
				{
					header:"Bieg 17",
					distance:17,
					up:1400,
					down:1400,
					priceMin:40,
					priceMax:80,
					location:"Jurków",
					date:1522738800000,
					category:"długi",
					pointsUTMB:0,
					pointsBUGT:0,
					timeLimit:5,
					playersLimit:300,
					country:"Poland",
					www:"http://www.wp.pl",
					signup:"http://www.wp.pl/poczta"
				},
				{
					header:"Bieg 10",
					distance:10,
					up:100,
					down:100,
					priceMin:10,
					priceMax:20,
					location:"Kraków",
					date:1522738800000,
					category:"długi",
					pointsUTMB:0,
					pointsBUGT:0,
					timeLimit:5,
					playersLimit:300,
					country:"Poland",
					www:"http://www.wp.pl",
					signup:"http://www.wp.pl/poczta"
				}
			];*/
	
}])