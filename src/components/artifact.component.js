import React, { Component } from "react";
import ArtifactDataService from "../services/artifact.service";

export default class Artifact extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeCenter= this.onChangeCenter.bind(this);
    this.onChangeEnvironment = this.onChangeEnvironment.bind(this);
    this.onChangeData = this.onChangeData.bind(this);
    this.onChangeType = this.onChangeType.bind(this);
    this.getArtifact = this.getArtifact.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateArtifact = this.updateArtifact.bind(this);
    this.deleteArtifact = this.deleteArtifact.bind(this);

    this.state = {
      currentArtifact: {
        id: null,
        title: "",
        center:"",
        environment: "",
        data: "",
        type: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getArtifact(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentArtifact: {
          ...prevState.currentArtifact,
          title: title
        }
      };
    });
  }

  onChangeCenter(e) {
    const center = e.target.value;
    this.setState(function(prevState) {
      return {
        currentArtifact: {
          ...prevState.currentArtifact,
          center: center
        }
      };
    });
  }

  onChangeEnvironment(e) {
    const environment = e.target.value;
    this.setState(function(prevState) {
      return {
        currentArtifact: {
          ...prevState.currentArtifact,
          environment: environment
        }
      };
    });
  }


  onChangeData(e) {
    const data = e.target.value;
    this.setState(function(prevState) {
      return {
        currentArtifact: {
          ...prevState.currentArtifact,
          data: data
        }
      };
    });
  }


  onChangeType(e) {
    const type = e.target.value;
    this.setState(function(prevState) {
      return {
        currentArtifact: {
          ...prevState.currentArtifact,
          type: type
        }
      };
    });
  }


  getArtifact(id) {
    ArtifactDataService.get(id)
      .then(response => {
        console.log("Response from api call", response);
        this.setState({
          currentArtifact: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentArtifact.id,
      title: this.state.currentArtifact.title,
      center: this.state.currentArtifact.description,
      environment: this.state.currentArtifact.environment,
      data: this.state.currentArtifact.data,
      type: this.state.currentArtifact.type,
      status: this.state.currentArtifact.status,
      published: status
    };

    ArtifactDataService.update(this.state.currentArtifact.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentArtifact: {
            ...prevState.currentArtifact,
            published: status,
            status: "Published",
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateArtifact() {
    console.log(
      this.state.currentArtifact.id,
      this.state.currentArtifact
    )
    ArtifactDataService.update(
      this.state.currentArtifact.id,
      this.state.currentArtifact
    )
      .then(response => {
        console.log(response.data);
        //this.props.history.push('/artifacts')
        this.setState({
          message: "The artifact was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteArtifact() {    
    ArtifactDataService.delete(this.props.match.params.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/artifacts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentArtifact } = this.state;

    return (
      <div>
        {currentArtifact ? (
          <div className="col-md-8 offset-2">
            <h4>Artifact Review</h4>
            <form>
            <div className="row mt-3">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="title">Application Name</label>
                  <input type="text" className="form-control" id="title" required value={currentArtifact.title}
                    onChange={this.onChangeTitle} name="title" />
                </div>
        
                <div className="form-group">
                  <label htmlFor="center">Center</label>
                  <input type="text" className="form-control" id="center" required value={currentArtifact.center}
                    onChange={this.onChangeCenter} name="center" />
                </div>

                <div className="form-group">
                  <label htmlFor="environment">Environment</label>
                  <input type="text" className="form-control" id="environment" required value={currentArtifact.environment}
                    onChange={this.onChangeEnvironment} name="environment" />
                </div>
              </div>
              <div className="col-md-6">

              <div className="form-group">
                  <label htmlFor="data">Data Type</label>
                  <input type="text" className="form-control" id="data" required value={currentArtifact.data}
                    onChange={this.onChangeData} name="data" />
                </div>
                
        
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <input type="text" className="form-control" id="type" required value={currentArtifact.type}
                    onChange={this.onChangeType} name="type" />
                </div>
              </div>
            </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentArtifact.published ? "Published" : "Pending"}
              </div>
            </form>

            {currentArtifact.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteArtifact}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateArtifact}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Artifact...</p>
          </div>
        )}
      </div>
    );
  }
}
