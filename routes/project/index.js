'use strict';
const db=require('~/lib/db');
const sql=require('~/lib/sql');

/****** handleProjects *******/
function handleProjects(req, reply){
  (async function(){
    var results=await db.execute(sql.project.getAll);
    reply(results);
  })()
  .catch((err)=>{
    throw err;
  });
}
/****-- end handleProjects --***/


/****** handleProjId *************/
function handleProjId(req, reply){
  (async function(){
    const result=await db.execute(sql.project.search, req.params.id);
    reply(result);
  })()
  .catch((err)=>{
    throw err;
  });
}

/*** end handleProjId ************/


/****** handleInsertPrj ********/
function handleInsertPrj(req, reply){
  (async function(){
    const {proj_name, due_date, state, description} = req.payload;
    var results=await db.execute(sql.project.insert, [proj_name, due_date, state, description]);
    reply();
  })()
  .catch((err)=>{
    throw err;
  });
}
/*****-- end handleInsertPrj ---*****/


/****** handleAddTask ******************/
function handleAddTask(req, reply){
  (async function(){
    const {prj_id, task_name, state, description} = req.payload;
    //console.log('handleAddTask: '+task_name + ' '+ description+ ' ' + state + '  '+prj_id);
    var result=await db.execute(sql.task.add, [prj_id, task_name, state, description]);
    reply();
  })()
  .catch((err)=>{
    throw err;
  });
}

/****** end handleAddTask ************/

/******* handleGetTask ***********/
function handleGetTaskName(req, reply){
  (async function(){
    const row=await db.execute(sql.task.search, req.params.prjId);
    reply(row);
  })()
  .catch((err)=>{
    throw err;
  });
}
/****** end handleGetTask ********/

/******* handleGetTskNote *************/
function handleGetTskNote(req, reply){
  (async function(){
    const row=await db.execute(sql.work_note.search, req.params.tskId);
    //console.log(row);
    reply(row);
  })()
  .catch((err)=>{
    throw err;
  });
}
/****** end handleGetTskNote *********/

/******** handlePostNote ***********/
function handlePostNote(req, reply){
  (async function(){
      const{tskId, work_note} = req.payload;
      //console.log(work_note + ' ' +tskId);
      const row=await db.execute(sql.work_note.insert, [tskId, work_note]);
      reply(1);
    })()
    .catch((err)=>{
      throw err;
    });
}
/******* end handlePostNote ********/

/******* handleUpdateProject *******/
function handleUpdateProject(req, reply){
  (async function(){
    const{prjId, description, state, dueDate, completeDate} = req.payload;
    //console.log(prjId + description + state + dueDate + completeDate);
    const result=await db.execute(sql.project.update, [dueDate, state, completeDate, description, prjId]);
    reply(1);
  })()
  .catch((err)=>{
    throw err;
  });
}
/******* end handleUpdateProject ***/

/******** handleUpdateTaskState ***********/
function handleUpdateTaskState(req, reply){
  (async function(){
    const {tskState, tskId} = req.payload
    //console.log(tskState, tskId);
    const result=await db.execute(sql.task.update, [tskState, tskId]);
    reply(1);
  })()
  .catch((err)=>{
    throw err;
  });
}

/******** end handleUpdateTaskState *******/

module.exports=[
  {
    method:'GET',
    path:'/projects',
    handler:handleProjects
  },
  {
    method:'GET',
    path:'/project/{id}',
    handler:handleProjId
  },
  {
    method:'POST',
    path:'/insert/project',
    handler:handleInsertPrj
  },
  {
    method:'POST',
    path:'/add/task',
    handler:handleAddTask
  },
  {
    method:'GET',
    path:'/get/task-name/{prjId}',
    handler:handleGetTaskName
  },
  {
    method:'GET',
    path:'/get/task-note/{tskId}',
    handler:handleGetTskNote
  },
  {
    method:'POST',
    path:'/post/note',
    handler:handlePostNote
  },
  {
    method:'POST',
    path:'/update/project',
    handler:handleUpdateProject
  },
  {
    method:'POST',
    path:'/update/task-state',
    handler:handleUpdateTaskState
  }
]
