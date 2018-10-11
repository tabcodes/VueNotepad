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