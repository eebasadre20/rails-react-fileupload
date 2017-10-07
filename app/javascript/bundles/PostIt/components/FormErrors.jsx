import React from 'react';
import { FieldNameCapitalize } from './helpers/StringHelpers'

export const FormErrors = ({formErrors}) => {
 return(
  <div className='row'>
    <ul className="list-group">
      { Object.keys( formErrors ).map( ( fieldName, i ) => {
        return <li key={i} className="list-group-item has-error">{ FieldNameCapitalize( fieldName ) } { formErrors[fieldName] }</li>
      })}
    </ul>
  </div>
 )
}
  