import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import _ from 'lodash';

import { createPost } from '../actions/';

const FIELDS = {
  title: {
    id: 1,
    type: 'input',
    label: 'Title for post'
  },
  categories: {
    id: 2,
    type: 'input',
    label: 'Enter some categories for this post',
  },
  content: {
    id: 3,
    type: 'textarea',
    label: 'Post contents'
  }
};

class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  onSubmit = (props) => {
    this.props.createPost(props)
      .then(() => {
        // blog posts has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with <thead>
        // new path to navigate to
        this.context.router.push('/');
      });
  }

  renderFiel = (fieldConfig, field) => {
    const fieldHelper = this.props.fields[field];

    return (
        <div key={fieldConfig.id} className={`form-group ${fieldHelper.touched && fieldHelper.invalid ? 'has-danger' : ''}`}>
          <label>{fieldConfig.label}</label>
          <fieldConfig.type type="text" className="form-control" {...fieldHelper} />
          <div className="text-help">
            {fieldHelper.touched ? fieldHelper.error : '' }
          </div>
        </div>
    );
  }

  render() {
    const { fields: {title, categories, content}, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create A New Post</h3>
        {_.map(FIELDS, this.renderFiel)}
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancelar</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  
  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = `Enter a ${field}`;
    }
  });

  return errors;
}

// connect. first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
}, null, { createPost })(PostsNew);
