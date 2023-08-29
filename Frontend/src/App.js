import React from "react";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      activeItem: {
        id: null,
        title: "",
        description: "",
      },
      editing: false,
    };
    this.fetchTasks = this.fetchTasks.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCookie = this.getCookie.bind(this);
  }

  componentWillMount() {
    this.fetchTasks();
  }

  fetchTasks() {
    console.log("fetching ...");
    fetch("http://127.0.0.1:8000/api/task-list/")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          todoList: data,
        });
      })
      .catch((err) => console.log(`Error : ${err}`));
  }

  handleChange(e) {
    // var name = e.target.name;
    var value = e.target.value;
    // console.log(`name is ${name} , and value is ${value}`);
    this.setState({
      activeItem: {
        ...this.state.activeItem,
        title: value,
      },
    });
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(`Item is : ${this.state.activeItem}`);

    let csrfToken = this.getCookie('csrftoken');
    let url = "http://127.0.0.1:8000/api/task-create/";

    if(this.state.editing === true) {
      url = `http://127.0.0.1:8000/api/task-update/${this.state.activeItem.id}/`;
      this.setState({
        editing : false,
      })
    }

    
    fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "X-CSRFToken" : csrfToken,
      },
      body: JSON.stringify(this.state.activeItem),
    })
      .then((response) => {
        console.log(`response is : ${response.json()}`);
        this.fetchTasks();
        this.setState({
          activeItem: {
            id: null,
            title: "",
            description: "",
          },
        });
      })
      .catch((err) => {
        console.log(`Error : ${err}`);
      });
  }


  startEdit(task) {
    this.setState({
      activeItem : task,
      editing : true,
    })
  }

  render() {
    var tasks = this.state.todoList;
    var self = this
    return (
      <div className="container">
        <div id="task-container">
          <div id="form-wrapper">
            <form id="form" onSubmit={this.handleSubmit}>
              <div className="flex-wrapper">
                <div style={{ flex: 6 }}>
                  <input
                    className="form-control"
                    id="title"
                    type="text"
                    name="title"
                    value={this.state.activeItem.title}
                    placeholder="Add task.."
                    onChange={this.handleChange}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <input
                    id="submit"
                    className="btn btn-warning"
                    type="submit"
                    name="Add"
                  />
                </div>
              </div>
            </form>
          </div>

          <div className="list-wrapper">
            {tasks.map((task, index) => {
              return (
                <div key={index} className="task-wrapper flex-wrapper">
                  <div>
                    <span> task : {task.title}</span>
                  </div>

                  <div>
                    <span> created on : {task.created_on}</span>
                  </div>

                  <div style={{ flex: 2 }}>
                    <button
                      onClick={() => self.startEdit(task)}
                      className="btn btn-sm btn-outline-info"
                    >
                      Edit
                    </button>
                  </div>

                  <div style={{ flex: 2 }}>
                    <button
                      // onClick={() => self.deleteItem(task)}
                      className="btn btn-sm btn-outline-dark delete"
                    >
                      -
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
