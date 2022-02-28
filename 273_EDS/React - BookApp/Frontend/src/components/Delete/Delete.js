import React, {Component} from 'react';

class Delete extends Component{
    render(){
        return(
            <div class="container">
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
        )
    }
}

export default Delete;