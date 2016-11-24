import React, {Component} from 'react';
import Calendar from '../../shared_components/Calendar.js';
import DashboardNav from '../../shared_components/dashboard_nav.js';
import StudentInformation from './StudentInformation.js';
import handleMediaSubmit from '../../actions/resource_actions.js';
import StudentResources from './StudentResources'

class StudentDashboard extends Component {
	constructor(props) {
	super(props);
	this.state = {
		email: localStorage.getItem("email")
	};
	this.handleMediaSubmit = this.handleMediaSubmit.bind(this);
	}

	handleMediaSubmit(event){
		event.preventDefault();
		var selectedFile = document.getElementById('input').files[0];
		var fileName = document.getElementById('input').val;
		var form = new FormData();
		form.append("file", selectedFile);
		form.append("teacherEmail", localStorage.getItem("email"));

		var settings = {
		  "async": true,
		  "crossDomain": true,
		  "url": "http://localhost:8000/api/upload/s3",
		  "method": "POST",
		  "name": "name",
		  "headers": {
		    "cache-control": "no-cache",
		  },
		  "processData": false,
		  "contentType": false,
		  "mimeType": "multipart/form-data",
		  "data": form
		}

		$.ajax(settings).done(function (response) {
		  console.log(response);
		});
	}

	render(){
		return (
		  <div className="row">
			  <DashboardNav />
			  <div className="container">
			  <div className="row">
			  	<div className="col-lg-4">
					<StudentInformation studentEmail={this.state.email}/>
				</div>
				<StudentResources />
				<div className="col-lg-8">
					<Calendar />
				</div>
			  </div>
			  </div>
		  </div>
		)
	}
}
  

export default StudentDashboard