export class FormError {
    constructor() {
        this.errors = {};
    }

    get(field) {
        if (this.errors[field]) {
            return this.errors[field][0];
        }
    }

    record(errors) {
        this.errors = errors;
    }

    clear(field) {
        if(!field) this.errors = {};

        delete this.errors[field];
        
    }

    has(field) {
        return this.errors.hasOwnProperty(field);
    }

    any() {
        return Object.keys(this.errors).length > 0;
    }
}

export class Form {
    constructor(data) {
        this.originalData = data;
        this.errors = new FormError();

        for(let field in data) {
            this[field] = data[field];
        }

    }

    data() {
        let data = Object.assign({}, this);
        delete data.originalData;
        delete data.errors;

        return data;
    }

    onSuccess(response) {
        this.errors.clear();
        this.form_success = true;
    }

    onFail(error) {
        this.errors.record(error.response.data.errors);
        console.log(error.response.data.errors)
    }

    reset() {
        for(let field in this.originalData) {
            this[field] = '';
        }
    }

    submit(requestType, url) {
        this.form_loading = true;
        axios[requestType](url, this.data())
        .then(this.onSuccess.bind(this))
        .catch(this.onFail.bind(this))
        .then(this.form_loading = false);
    }

}

export class Note {

    constructor(form_data) {
        this.title = form_data.title;
        this.body = form_data.body;
        this.color = form_data.color;
        this.id = form_data.id;
        
        this.created_at = new Date(Date.now()).toLocaleString();
        this.edit_active = false;

        this.edit_props = {
            title: form_data.title,
            body: form_data.body
        };
 
      this.edit_errors = new FormError();
    }

    saveChanges() {
        this.title = this.edit_props.title;
        this.body = this.edit_props.body;
        this.edit_active = false;
    }

    discardChanges() {
        this.edit_props.title = this.title;
        this.edit_props.body = this.body;
        this.edit_active = false;
    }

    
}