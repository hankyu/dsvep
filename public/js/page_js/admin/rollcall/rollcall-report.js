;(function(){
    let
        rollcallReport,
        rollingLoading,
        runningNumberController,
        rollcallTable = rollcallTableModule();

    $(function(){
        runningNumberController = runningNumberModule();
        rollingLoading = rollingLoadingModule();
        rollcallReport = rollcallReportModule({rollingLoading: rollingLoading, runningNumberController: runningNumberController, rollcallTable: rollcallTable});
        rollcallReport.showTeachers();
    });
})();