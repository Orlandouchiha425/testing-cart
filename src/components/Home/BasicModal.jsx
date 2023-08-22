export default function BasicModal() {
  return (
    <>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        className="btn btn-primary btn-lg btn-block"
      >
        <h1> Important, READ ME:</h1>
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                <h1>Login Information </h1>
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Please Login or Sign up to view the whole Site</p>
              <h3>SignUp:</h3>If you sign up as Admin, you will be able to
              create games, Edit games, and Delete Games. However, if you sign
              up as admin. you will be able to do basic "User" things. ex: view
              all games, add games to cart. etc.
              <h3>Test logins:</h3>
              <h6>
                <em>user:</em>
              </h6>
              user@gmail.com <em>password:</em> 123456
              <br />
              <h6>
                <em>admin: </em>
              </h6>
              admin@gmail.com <em>password:</em> 123456
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
}
