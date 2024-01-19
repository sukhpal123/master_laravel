<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-light-primary elevation-2">
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
        <!-- <img class="small-image hidden" src="assets/images/logo.png" alt="VRB logo"> -->
        <span class="brand-text font-weight-light">
            <img class="brand-image" src="assets/images/logo.png" alt="VRB logo">
        </span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">

        <!-- Sidebar Menu -->
        <nav class="mt-5">
            <ul class="nav nav-pills nav-sidebar flex-column nav-child-indent" data-widget="treeview" role="menu"
                data-accordion="false">
                <!-- dashboard links -->
                <li class="nav-item">
                    <a href="dashboard" class="nav-link ">
                        <i class="nav-icon fas fa-tachometer-alt"></i>
                        <p>Dashboard</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ url('country') }}" class="nav-link {{ $name == 'country' ? 'active' : '' }}">
                        <i class="fa-solid fa-city"></i>
                        <p>Country</p>
                    </a>
                </li>
                <!-- state links -->
                <li class="nav-item">
                    <a href="{{ url('state') }}" class="nav-link {{ $name == 'state' ? 'active': '' }}">
                        <i class="fa-solid fa-city"></i>
                        <p>State</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ url('city') }}" class="nav-link {{ $name== 'city' ? 'active' : '' }}">
                        <i class="fa-solid fa-city"></i>
                        <p>City</p>
                    </a>
                </li>
                <li class="nav-item">
                    <a href="{{ url('location') }}" class="nav-link {{ $name== 'group_manage' ? 'active' : '' } ?>">
                    <i class="fa-solid fa-city"></i>
                        <p>Location</p>
                    </a>
                </li>

            </ul>
        </nav>
        <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
</aside>