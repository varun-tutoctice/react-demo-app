import React, { Component } from "react";
import ArtifactDataService from "../services/artifact.service";

export default class AddArtifact extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCenter= this.onChangeCenter.bind(this);
    this.onChangeEnvironment = this.onChangeEnvironment.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.saveArtifact = this.saveArtifact.bind(this);
    this.newArtifact = this.newArtifact.bind(this);

    this.state = {
      id: null,
      title: "",
      center:"",
      environment: "",
      data: "",
      type: "",
      status: "Pending",
      published: false,
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeCenter(e) {
    this.setState({
      center: e.target.value
    });
  }

  onChangeEnvironment(e) {
    this.setState({
      environment: e.target.value
    });
  }

  onChangeData(e) {
    this.setState({
      data: e.target.value
    });
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    });
  }


  saveArtifact() {
    var data = {
      title: this.state.title,
      center: this.state.center,
      environment: this.state.environment,
      data: this.state.data,
      type: this.state.type,
      status: this.state.status,
    };

    ArtifactDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          center: response.data.center,
          environment: response.data.environment,
          data: response.data.data,
          type: response.data.type,
          status: response.data.status,
          submitted: true,
          
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newArtifact() {
    
    this.setState({
      id: null,
      title: "",
      center: "",
      environment: "",
      data: "",
      type: "",
      status: "Pending",
      published: false,
      submitted: false,
    });
    this.props.history.push('/add')
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newArtifact}>
              Add
            </button>
          </div>
        ) : (
          
          <div className="row">
          <div className="col-md-8 offset-2">
          <h4 className="mt-2 mb-4">Add Artifact</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="title">Application Name</label>
                  <input type="text" className="form-control" id="title" required value={this.state.title}
                    onChange={this.onChangeTitle} name="title" />
                </div>
        
                <div className="form-group">
                  <label htmlFor="center">Center</label>
                  <input type="text" className="form-control" id="center" required value={this.state.center}
                    onChange={this.onChangeCenter} name="center" />
                </div>

                <div className="form-group">
                  <label htmlFor="environment">Environment</label>
                  <input type="text" className="form-control" id="environment" required value={this.state.environment}
                    onChange={this.onChangeEnvironment} name="environment" />
                </div>
              </div>
              <div className="col-md-6">

              <div className="form-group">
                  <label htmlFor="data">Data Type</label>
                  <input type="text" className="form-control" id="data" required value={this.state.data}
                    onChange={this.onChangeData} name="data" />
                </div>
                
        
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input type="text" className="form-control" id="type" required value={this.state.type}
                    onChange={this.onChangeType} name="type" />
                </div>
              </div>
            </div>
            <div className="row ml-1 mt-2">
            <button onClick={this.saveArtifact} className="btn btn-success">
            Submit
          </button>
            </div>
          </div>
        
        

        </div>
        )}
      </div>
    );
  }
}
