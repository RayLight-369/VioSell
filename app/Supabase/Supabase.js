import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lmxqvapkmczkpcfheiun.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession : false }
});



export const getData = async ({
  table,
  range,
  columns = [],
  where = {}
}) => {

  try {

    if (Array.isArray(columns)) {
      columns = columns.join(",");
    }

    let Data;

    if ( range && range.length == 2) {
      
      Data = await supabase
        .from(table)
        .select(columns)
        .match(where)
        .range(range[0], range[1]);
      
    } else {

      Data = await supabase
        .from(table)
        .select(columns)
        .match(where);
      
    }
    
    return { data: Data.data, statusText: Data.statusText, error: Data.error };

  } catch (error) {

    console.log(error);

  }

  return false;
  
};

export const insertData = async ({
  table,
  object
}) => {

  try {

    const {data, error, statusText} = await supabase
      .from(table)
      .insert(object)
      .select();
    
    return { data, error, statusText };
    
  } catch (error) {

    console.log(error);

  }

  return false;

};

export const updateData = async ({
  table,
  object,
  where
}) => {

  try {
    
    let Data = await supabase
      .from(table)
      .update(object)
      .match(where);
    
    
    return Data.data;

  } catch (error) {

    console.log(error);
    
  }
  
  return false;

};

export const exists = async ({
  table,
  where,
  columns = []
}) => {
  try{
    
    if (Array.isArray(columns)) {
      columns = columns.join(",");
    }

    let { data, error } = await supabase
      .from(table)
      .select(columns)
      .match(where);

    return !!data.length;
    
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const deleteData = async ({
  table,
  where,
}) => {
  try {
    const {data, error, statusText} = await supabase
      .from(table)
      .delete()
      .match(where);
    
    return {data, error, statusText};
  } catch (e) {
    console.log(e);
  }

  return false;
}