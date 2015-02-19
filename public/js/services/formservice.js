var app = angular.module('myApp');

app.service('formService', function() {
  this.data =
    [
      {
        tab: "General Information",
        completed: false,
        steps:  [
                  {title: "First Name", status: "Required", completed: false},
                  {title: "Middle Name", status: "Required", completed: false},
                  {title: "Last Name", status: "Required", completed: false},
                  {title: "Preferred Name", status: "Optional", completed: false},
                  {title: "Mother's Maiden Name", status: "Optional", completed: false},
                  {title: "Date of Birth", status: "Required", completed: false},
                  {title: "Gender", status: "Required", completed: false}
                ]
      },
      {
        tab: "Contact Information",
        completed: false,
        steps:  [
                  {title: "Address", status: "Required", completed: false},
                  {title: "City", status: "Required", completed: false},
                  {title: "State", status: "Required", completed: false},
                  {title: "Zip Code", status: "Required", completed: false},
                  
                ]
      }
    ]
});

