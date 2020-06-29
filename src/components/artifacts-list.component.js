import React, { Component } from "react";
import ArtifactDataService from "../services/artifact.service";
import { Link } from "react-router-dom";

export default class ArtifactList extends Component {
  constructor(props) {
    super(props);
    this.retrieveArtifacts = this.retrieveArtifacts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveArtifact = this.setActiveArtifact.bind(this);
    this.removeAllArtifacts = this.removeAllArtifacts.bind(this);

    this.state = {
      artifacts: [],
    };
  }

  componentDidMount() {
    this.retrieveArtifacts();
  }



  retrieveArtifacts() {
    ArtifactDataService.getAll()
      .then(response => {
        this.setState({
          artifacts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveArtifacts();
    this.setState({
      //currentArtifact: null,
      currentIndex: -1
    });
  }

  setActiveArtifact(artifact, index) {
    this.setState({
      //currentArtifact: artifact,
      currentIndex: index
    });
  }

  removeAllArtifacts() {
    ArtifactDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }



  render() {
    const {  artifacts } = this.state;

    return (
      <div className="list row mt-4">


        <div className="col-md-12">
          <h4>List of Artifacts</h4>


          <table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">Application Name</th>
      <th scope="col">Environment</th>
      <th scope="col">Status</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  {artifacts &&
              artifacts.map((artifact, index) => (
    <tr key={index}>
      <th scope="row">{artifact.title}</th>
      <td>{artifact.environment}</td>
      <td>{artifact.published ? "Published" : "Pending"}</td>
      <td>                  <Link
                to={"/artifacts/" + artifact.id}
                className="btn btn-sm btn-primary"
              >
                Review
              </Link></td>
    </tr>
           ))}
  </tbody>
</table>


          {/* <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllArtifacts}
          >
            Remove All
          </button> */}
        </div>
      </div>
    );
  }
}
