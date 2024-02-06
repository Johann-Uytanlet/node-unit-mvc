const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let req2 = {
        _id: '507asdghajsdhjgasd',
        body: {
            author: 'stswenguser',
            title: 'Updated',
            content: 'Random content2'
        }
    }

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {
        var updatePostStub;
    
        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
    
        afterEach(() => {
            // executed after the test case
            updatePostStub.restore();
        });

        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            updatePostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });
    
        it('should return the updated post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'Updated',
                title: 'Updated',
                content: 'Random content2',
                author: 'stswenguser',
                date: Date.now()
            };
    
            updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedResult);
    
            // Act
            PostController.update(req2, res);
    
            // Assert
            
            sinon.assert.calledWith(PostModel.updatePost, req2._id, req2.body);
            sinon.assert.calledWith(res.json, sinon.match(expectedResult));
    
        });
    });
    
describe('findPost', () => {
    var findPostStub;

    beforeEach(() => {
        // before every test case setup first
        res = {
            json: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        };
    });

    afterEach(() => {
        // executed after the test case
        findPostStub.restore();
    });

    it('should return the created post object', () => {
        // Arrange
        expectedResult = {
            _id: '507asdghajsdhjgasd',
            title: 'My first test post',
            content: 'Random content',
            author: 'stswenguser',
            date: Date.now()
        };

        findPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

        // Act
        PostController.create(req, res);

        // Assert
        sinon.assert.calledWith(PostModel.createPost, req.body);
        sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
        sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
        sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
    });

    it('should return the post object that is being looked for', () => {
        // Arrange
        expectedResult = {
            _id: '507asdghajsdhjgasd',
            title: 'My first test post',
            content: 'Random content',
            author: 'stswenguser',
            date: Date.now()
        };

        findPostStub = sinon.stub(PostModel, 'findPost').yields(null, expectedResult);

        // Act
        PostController.findPost(req2, res);

        // Assert
        sinon.assert.calledWith(PostModel.findPost, req2._id);
        sinon.assert.calledWith(res.json, sinon.match(expectedResult)); 
    }); 
})
});