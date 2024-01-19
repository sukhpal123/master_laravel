<!DOCTYPE html>
<html lang="en">

<head>
    @include('header')
</head>

<body id="bmain"
    class="hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed text-sm bg-body">
    <div class="wrapper">
        @include('header_top')
        @include('sidebar')

        <div class="content-wrapper bg-body">
            @if(session('msg'))
            <div class="alert alert-success alert-dismissible mt-4" id="alertMsg">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                <h4><i class="icon fa fa-check"></i> Message!</h4>
                {{ session('msg') }}
            </div>
            <script>
            // Automatically hide the alert after 10 seconds
            setTimeout(function() {
                document.getElementById('alertMsg').style.display = 'none';
            }, 3000);
            </script>
            @endif
            @if(isset($page_name))

            @include($page_name)
            @endif
            <!-- Main content -->

        </div>
    </div>


    @include('footer')
    @include('pagescript')
</body>

</html>