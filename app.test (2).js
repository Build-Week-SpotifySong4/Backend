const request = require('supertest');
const server = require('../api/server');


// User information for testing
let randomNum = Math.random() * 8000;

const testRegister = {
    "username": `tester${randomNum}`,
    "password": "LambdaTesting",
    "name": "Tester"
};

const testLogin = {
    "username": `tester${randomNum}`,
    "password": "LambdaTesting"
};

// Sample card to send to DB 

const testCard = {
    "person_name": `testPerson${randomNum}`,
    "business_name": "testBusiness",
    "url_string": "https://as1.ftcdn.net/jpg/02/04/66/02/500_F_204660283_onveez8hTPfZlIDb9v67AUQA7kwGVX79.jpg",
    "card_owner": 1,
    "category": "testCategory"
}

// Test to GET for /api/cards

describe('Get /api/users/cards', () => {
    it('Should return status code 200', () => {
        request(server)
        .post('/api/users/register')
        .send(testRegister)
        .then(res => {
            return request(server)
            .post('/api/users/login')
            .send(testLogin)
            .then(response => {
                const currentToken = response.body.token;
                return request(server)
                .get('/api/users/cards')
                .set('Authorization', currentToken)
                .then(response => {
                    expect(response.status).toBe(200)
                })
            })
        })
    });
    it('Should return a response body', () => {
            return request(server)
            .post('/api/users/login')
            .send(testLogin)
            .then(response => {
                const currentToken = response.body.token;
                return request(server)
                .get('/api/users/cards')
                .set('Authorization', currentToken)
                .then(response => {
                    expect(response.body).toBeTruthy();
                })
            })
        })
    });

    describe('POST api/users/cards', () => {
        it('should return status code of 201', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send(testCard) 
                        .then(res => {
                            expect(res.status).toBe(201);
                        });  
                });
        })
        it('should return a body with card_owner property', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send(testCard) 
                        .then(res => {
                            expect(res.body).toHaveProperty('card_owner');
                        });  
                });
        });
    });

    describe('GET /api/users/cards/:id/collection', () => {
        it('returns a 200 OK status code after getting a card collection', () => {
            return request(server)
            .post('/api/users/login')
            .send(testLogin)
            .then(response => {
                const currentToken = response.body.token;
                return request(server)
                .get('/api/users/cards/1/collection')
                .set('Authorization', currentToken)
                .then(res => {
                    expect(res.status).toBe(200);
                })
            })
        })
        it('returns a card_owner property for the first card after getting a card collection', () => {
            return request(server)
            .post('/api/users/login')
            .send(testLogin)
            .then(response => {
                const currentToken = response.body.token;
                return request(server)
                .get('/api/users/cards/1/collection')
                .set('Authorization', currentToken)
                .then(res => {
                    console.log(res)
                    expect(res.body[0]).toHaveProperty('card_owner');
                })
            })
        })
    });
    describe('GET /api/users/cards/:id', () => {
        it('returns a 200 status code after retreiving card', () => {
            return request(server)
            .post('/api/users/login')
            .send(testLogin)
            .then(response => {
                const currentToken = response.body.token;
                return request(server)
                .get('/api/users/cards/1')
                .set('Authorization', currentToken)
                .then(res => {
                    expect(res.status).toBe(200);
                });
            });
        });
  it('returns a url_string property after retreiving card', () => {
            return request(server)
            .post('/api/users/login')
            .send(testLogin)
            .then(response => {
                const currentToken = response.body.token;
                return request(server)
                .get('/api/users/cards/1')
                .set('Authorization', currentToken)
                .then(res => {
                    expect(res.body).toHaveProperty('url_string');
                });
            });
        });
    });

    describe('PUT /api/users/cards/:id', () => {
        it('returns a 200 status code after updating card', () => {
            return request(server)
            .post('/api/users/login')
            .send(testLogin)
            .then(response => {
                const currentToken = response.body.token;
                return request(server)
                    .put('/api/users/cards/1')
                    //.get('/api/cards/1')
                    .set('Authorization', currentToken)
                    .send({"business_name": `Testing Again${randomNum}`})
                    .then(res => {
                        expect(res.status).toBe(200);
                    });
            });
        });
    });
    
    it('returns a an updated property of business_name after updating card', () => {
        return request(server)
        .post('/api/users/login')
        .send(testLogin)
        .then(response => {
            const currentToken = response.body.token;
            return request(server)
                .put('/api/users/cards/1')
                //.get('/api/cards/1')
                .set('Authorization', currentToken)
                .send({"business_name": `Testing Again${randomNum}`})
                .then(res => {
                    expect(res.body.business_name).toEqual(`Testing Again${randomNum}`);
                });
        });
    });

    describe('DELETE api/users/cards/:id', () => {
        it('returns a 200 OK after deleting card', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    // create a card next
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send(testCard) 
                        .then(res => {
                            let card_id = res.body.id;
                            return request(server)
                                .delete(`/api/users/cards/${card_id}`)
                                .set('Authorization', currentToken)
                                .then(lastRes => {
                                    expect(lastRes.status).toBe(200);
                                });
                        });

                    });    
        });

        it('returns a message with correct id after deleting card', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    // create a card next
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send(testCard) 
                        .then(res => {
                            let card_id = res.body.id;
                            // now delete that card
                            return request(server)
                                .delete(`/api/users/cards/${card_id}`)
                                .set('Authorization', currentToken)
                                .then(lastRes => {
                                    expect(lastRes.body.message).toEqual(`Successfully deleted card of ${card_id}`);
                                });
                        });

                });    
        });
    });

    describe('POST api/users/cards/:user_id/:card_id', () => {
        it('returns status code 201 after adding card to collection of specified user', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    const user_id = response.body.user.id;
                    //create a new card, NOT in this user's collection (YET...)
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send({
                            "person_name": `Random${randomNum}`,
                            "business_name": "testBusiness",
                            "url_string": "https://as1.ftcdn.net/jpg/02/04/66/02/500_F_204660283_onveez8hTPfZlIDb9v67AUQA7kwGVX79.jpg",
                            "card_owner": 1,
                            "category": "testCategory"
                        }) 
                        .then(res => {
                            let card_id = res.body.id;
                            //now we're ready to add the card to the user's collection
                            return request(server)
                                .post(`/api/users/cards/${user_id}/${card_id}`)
                                .set('Authorization', currentToken)
                                .then(lastRes => {
                                    expect(lastRes.status).toBe(201);
                                });

                        });
                    });          
        });

        it('returns a body of length 1 or greater after adding card to collection of specified user', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    const user_id = response.body.user.id;
                    //create a new card, NOT in this user's collection (YET...)
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send({
                            "person_name": `Random${randomNum}`,
                            "business_name": "testBusiness",
                            "url_string": "https://as1.ftcdn.net/jpg/02/04/66/02/500_F_204660283_onveez8hTPfZlIDb9v67AUQA7kwGVX79.jpg",
                            "card_owner": 1,
                            "category": "testCategory"
                        }) 
                        .then(res => {
                            let card_id = res.body.id;
                            //now we're ready to add the card to the user's collection
                            return request(server)
                                .post(`/api/users/cards/${user_id}/${card_id}`)
                                .set('Authorization', currentToken)
                                .then(lastRes => {
                                    expect(lastRes.body.length).toBeGreaterThanOrEqual(1);
                                });

                        });
                    });          
        });
    });

    describe('DELETE api/users/cards/:user_id/:card_id', () => {
        it('returns a status code of 200 after successfully deleting card from a collection', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    const user_id = response.body.user.id;
                    //create a new card, NOT in this user's collection (YET...)
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send({
                            "person_name": `Lambda${randomNum}`,
                            "business_name": "testBusiness",
                            "url_string": "https://as1.ftcdn.net/jpg/02/04/66/02/500_F_204660283_onveez8hTPfZlIDb9v67AUQA7kwGVX79.jpg",
                            "card_owner": 1,
                            "category": "testCategory"
                        }) 
                        .then(res => {
                            let card_id = res.body.id;
                            //now we're ready to add the card to the user's collection
                            return request(server)
                                .post(`/api/users/cards/${user_id}/${card_id}`)
                                .set('Authorization', currentToken)
                                .then(secondTolastRes => {
                                    //Finally, deleting card from the collection
                                    return request(server)
                                        .delete(`/api/users/cards/${user_id}/${card_id}`)
                                        .set('Authorization', currentToken)
                                        .then(lastRes => {
                                            expect(lastRes.status).toBe(200);
                                        });
                                });

                        });
                    });          
        });
    })
        it('returns a message with user id and card id after successfully deleting card from a collection', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    const user_id = response.body.user.id;
                    //create a new card, NOT in this user's collection (YET...)
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send({
                            "person_name": `Lambda${randomNum}`,
                            "business_name": "testBusiness",
                            "url_string": "https://as1.ftcdn.net/jpg/02/04/66/02/500_F_204660283_onveez8hTPfZlIDb9v67AUQA7kwGVX79.jpg",
                            "card_owner": 1,
                            "category": "testCategory"
                        }) 
                        .then(res => {
                            let card_id = res.body.id;
                            //now we're ready to add the card to the user's collection
                            return request(server)
                                .post(`/api/users/cards/${user_id}/${card_id}`)
                                .set('Authorization', currentToken)
                                .then(secondTolastRes => {
                                    //Finally, deleting card from the collection
                                    return request(server)
                                        .delete(`/api/users/cards/${user_id}/${card_id}`)
                                        .set('Authorization', currentToken)
                                        .then(lastRes => {
                                            expect(lastRes.body.message).toEqual(`Deleted card of id ${card_id} from collection of user ${user_id}`);
                                        });
                                });

                        });
                    });          
        });

        it('does not remove a card from the entire database after successfully deleting that card from a collection', () => {
            return request(server)
                .post('/api/users/login')
                .send(testLogin)
                .then(response => {
                    const currentToken = response.body.token;
                    const user_id = response.body.user.id;
                    //create a new card, NOT in this user's collection (YET...)
                    return request(server)
                        .post('/api/users/cards')
                        .set('Authorization', currentToken)
                        .send({
                            "person_name": `Lambda${randomNum}`,
                            "business_name": "testBusiness",
                            "url_string": "https://as1.ftcdn.net/jpg/02/04/66/02/500_F_204660283_onveez8hTPfZlIDb9v67AUQA7kwGVX79.jpg",
                            "card_owner": 1,
                            "category": "testCategory"
                        }) 
                        .then(res => {
                            let card_id = res.body.id;
                            //now we're ready to add the card to the user's collection
                            return request(server)
                                .post(`/api/users/cards/${user_id}/${card_id}`)
                                .set('Authorization', currentToken)
                                .then(thirdTolastRes => {
                                    //Next, deleting card from the collection
                                    return request(server)
                                        .delete(`/api/users/cards/${user_id}/${card_id}`)
                                        .set('Authorization', currentToken)
                                        .then(secondToLastRes => {
                                            //Finally, retrieving that card from the database
                                            return request(server)
                                                .get(`/api/users/cards/${card_id}`)
                                                .set('Authorization', currentToken)
                                                .then(lastRes => {
                                                    expect(lastRes.body).toHaveProperty('url_string');
                                                });

                                        });
                                });

                        });
                    });          
        });