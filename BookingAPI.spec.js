// BookingAPI.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test


describe('Testing API Endpoints Using Cypress', () => {
    it('Test GET Request', () => {
        cy.request('https://restful-booker.herokuapp.com/booking')
            .then((response) => {
            expect(response.status).to.eq(200)
                expect(response.body[0]).to.have.all.keys(
                    'bookingid'
                )
        })
    })

    it('Test GET Request', () => {
        cy.request('https://restful-booker.herokuapp.com/booking/20')
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.all.keys(
                    'firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates','additionalneeds'
                )
            })
    })

    it('Test POST Request', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: { contenttype: 'application / json' },
            body: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additionalneeds": "Breakfast"
        }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).has.property("bookingid");
            expect(response.body).has.property("booking");
            expect(response.body.booking).has.property("firstname", "Jim");
            expect(response.body.booking).has.property("lastname", "Brown");
            expect(response.body.booking).has.property("totalprice", 111);
            expect(response.body.booking).has.property("depositpaid", true);
            expect(response.body.booking.bookingdates).has.property("checkin", "2018-01-01");
            expect(response.body.booking.bookingdates).has.property("checkout", "2019-01-01");
            expect(response.body.booking).has.property("additionalneeds", "Breakfast");
        })
})
    
    it('Test PUT Request', () => {
   // cy.getCookie('token','abc123')
        cy.request({
        method: 'PUT',
        url: 'https://restful-booker.herokuapp.com/booking/20',
        headers:{
            contenttype: 'application / json',
            accept: 'application/json',
            authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        },
        body: {
            "firstname": "James",
            "lastname": "Brown",
            "totalprice": 111,
            "depositpaid": true,
            "bookingdates": {
                "checkin": "2018-01-01",
                "checkout": "2019-01-01"
            },
            "additionalneeds": "Breakfast"
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body).has.property("firstname", "James");
        expect(response.body).has.property("lastname", "Brown");
        expect(response.body).has.property("totalprice", 111);
        expect(response.body).has.property("depositpaid", true);
        expect(response.body.bookingdates).has.property("checkin", "2018-01-01");
        expect(response.body.bookingdates).has.property("checkout", "2019-01-01");
        expect(response.body).has.property("additionalneeds", "Breakfast");
    })
})

it('Test DELETE Request', () => {
    cy.request({
        method: 'DELETE',
        url: 'https://restful-booker.herokuapp.com/booking/20',
        headers: {
            //contenttype: 'application / json',
            //accept: 'application/json',
            authorization: 'Basic YWRtaW46cGFzc3dvcmQxMjM='
        }
    }).then((response) => {
        expect(response.status).to.eq(201)
            //expect(response.body).to.be.empty;
        })
})

})