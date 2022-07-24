// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { recurse } from "cypress-recurse"

Cypress.Commands.add('locateElement',(locator)=>{
    switch(locator){
        case 'Red': return cy.get('.Home_red__H_jTz')
        case 'Yellow': return cy.get('.Home_orange__CeNmC')
        case 'Green': return cy.get('.Home_green__g8l_e')
        case 'switchButton': return cy.get('.Home_switch__R__AJ')
    }
}) 

Cypress.Commands.add('validateStateWithinSeconds',(numberOfMiliSeconds,redState,yelloState,greenState)=>{
    const dayjs = require("dayjs");
    const addMiliSeconds = dayjs().add(numberOfMiliSeconds, 'millisecond').format('H:m:ss:SSS')
    cy.log('addMiliSeconds',addMiliSeconds)
    recurse(
      ()=>
        cy.wrap(dayjs().format('H:m:ss:SSS')),
        (currentTime) => 
          //expect(currentTime).to.equal(addOneSecond)
         currentTime >= addMiliSeconds ? true :false
        
        ,{
          log: true,
          limit:500 * numberOfMiliSeconds ,
          timeout:50 * numberOfMiliSeconds ,
          delay: 5,
          post(){
            cy.validateSignalState(redState,yelloState,greenState)
          }
        }
   ) 
})

Cypress.Commands.add('validateSignalState',(redState,yelloState,greenState)=>{
    const redOn = 'rgb(255, 0, 0)'
    const yellowOn = 'rgb(255, 165, 0)'
    const greenOn = 'rgb(0, 128, 0)'
    const off = 'rgb(128, 128, 128)'
    
    redState ? cy.locateElement('Red').should('have.css','background-color',redOn) : cy.locateElement('Red').should('have.css','background-color',off)
    yelloState ? cy.locateElement('Yellow').should('have.css','background-color',yellowOn) : cy.locateElement('Yellow').should('have.css','background-color',off)
    greenState ? cy.locateElement('Green').should('have.css','background-color',greenOn) : cy.locateElement('Green').should('have.css','background-color',off)
})