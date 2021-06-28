function MainNotice(props) {
  return(
    <div>
      <div className={"list-group"}>
        <a href="#" className={"list-group-item list-group-item-action"}>
          <div className={"d-flex w-100 justify-content-between"}>
            <h5 className={"mb-1"}>List group item heading</h5>
            <small>3 days ago</small>
          </div>
          <p className="mb-1">Some placeholder content in a paragraph.</p>
        </a>
        <a href="#" className={"list-group-item list-group-item-action"}>
          <div className={"d-flex w-100 justify-content-between"}>
            <h5 className={"mb-1"}>List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className={"mb-1"}>Some placeholder content in a paragraph.</p>
        </a>
        <a href="#" className={"list-group-item list-group-item-action"}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className={"mb-1"}>Some placeholder content in a paragraph.</p>
        </a>
        <a href="#" className={"list-group-item list-group-item-action"}>
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">List group item heading</h5>
            <small className="text-muted">3 days ago</small>
          </div>
          <p className={"mb-1"}>Some placeholder content in a paragraph.</p>
        </a>
        
      </div>
    </div>
  );
}

export default MainNotice;