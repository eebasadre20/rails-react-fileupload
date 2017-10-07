const imageBase64 = 'image_base64';

export const FieldNameCapitalize = ( fieldName ) => {
  if( fieldName === imageBase64 ) 
    fieldName = ReplaceUnderScoreToSpace( fieldName );
 
  return fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
 }

 export const ReplaceUnderScoreToSpace = ( fieldName ) => {
  return fieldName.replace(/_base64/g, ' ');
 }