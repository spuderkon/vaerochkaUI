USE [master]
GO
/****** Object:  Database [vaerochka]    Script Date: 30.03.2023 3:27:36 ******/
CREATE DATABASE [vaerochka]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'vaerochka', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\vaerochka.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'vaerochka_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\vaerochka_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [vaerochka] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [vaerochka].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [vaerochka] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [vaerochka] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [vaerochka] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [vaerochka] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [vaerochka] SET ARITHABORT OFF 
GO
ALTER DATABASE [vaerochka] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [vaerochka] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [vaerochka] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [vaerochka] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [vaerochka] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [vaerochka] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [vaerochka] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [vaerochka] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [vaerochka] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [vaerochka] SET  DISABLE_BROKER 
GO
ALTER DATABASE [vaerochka] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [vaerochka] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [vaerochka] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [vaerochka] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [vaerochka] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [vaerochka] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [vaerochka] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [vaerochka] SET RECOVERY FULL 
GO
ALTER DATABASE [vaerochka] SET  MULTI_USER 
GO
ALTER DATABASE [vaerochka] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [vaerochka] SET DB_CHAINING OFF 
GO
ALTER DATABASE [vaerochka] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [vaerochka] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [vaerochka] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [vaerochka] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'vaerochka', N'ON'
GO
ALTER DATABASE [vaerochka] SET QUERY_STORE = OFF
GO
USE [vaerochka]
GO
/****** Object:  Table [dbo].[aircraft]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[aircraft](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[model] [nvarchar](20) NOT NULL,
	[business_seats] [int] NOT NULL,
	[economy_seats] [int] NOT NULL,
	[image] [nvarchar](200) NOT NULL,
	[description] [nvarchar](4000) NOT NULL,
 CONSTRAINT [PK_plane] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[airline]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[airline](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](25) NOT NULL,
	[image] [nvarchar](200) NOT NULL,
 CONSTRAINT [PK_airlines] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[airport]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[airport](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[code] [nvarchar](3) NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[city_id] [int] NOT NULL,
 CONSTRAINT [PK_airport] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[city]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[city](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[country_id] [int] NOT NULL,
 CONSTRAINT [PK_city] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[client]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[client](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[surname] [nvarchar](20) NOT NULL,
	[lastname] [nvarchar](20) NULL,
	[passport_id] [int] NOT NULL,
 CONSTRAINT [PK_client] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[contact]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[contact](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[email] [nvarchar](100) NOT NULL,
	[number] [nvarchar](11) NOT NULL,
 CONSTRAINT [PK_contact] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[country]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[country](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](25) NOT NULL,
 CONSTRAINT [PK_country] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[passport]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[passport](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[birthdate] [date] NOT NULL,
	[citizenship_id] [int] NOT NULL,
	[number] [nvarchar](10) NOT NULL,
	[country_of_issue_id] [int] NOT NULL,
	[validity_period] [date] NOT NULL,
 CONSTRAINT [PK_passport] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[registration]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[registration](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[route_id] [int] NOT NULL,
	[code] [nvarchar](8) NOT NULL,
	[client_id] [int] NOT NULL,
	[contact_id] [int] NOT NULL,
	[tariff_id] [int] NOT NULL,
	[seat] [nvarchar](4) NOT NULL,
	[price] [money] NOT NULL,
	[registered] [bit] NOT NULL,
 CONSTRAINT [PK_registration] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[route]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[route](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[airline_id] [int] NOT NULL,
	[start_time] [datetime] NOT NULL,
	[end_time] [datetime] NOT NULL,
	[price] [money] NOT NULL,
	[code] [nvarchar](10) NOT NULL,
	[time_in_fly] [int] NOT NULL,
	[aircraft_id] [int] NOT NULL,
	[boarding_gate] [nvarchar](10) NOT NULL,
	[start_airport_id] [int] NOT NULL,
	[end_airport_id] [int] NOT NULL,
 CONSTRAINT [PK_route] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tariff]    Script Date: 30.03.2023 3:27:36 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tariff](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[airline_id] [int] NOT NULL,
	[name] [nvarchar](20) NOT NULL,
	[hand_luggage] [bit] NOT NULL,
	[luggage] [bit] NOT NULL,
	[meal] [bit] NOT NULL,
	[rebooking] [bit] NOT NULL,
	[refund] [bit] NOT NULL,
	[markup] [int] NOT NULL,
	[insurance] [bit] NOT NULL,
	[seat_choice] [bit] NOT NULL,
	[vip_lounge] [bit] NOT NULL,
	[boarding_priority] [bit] NOT NULL,
 CONSTRAINT [PK_tariff] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[aircraft] ON 

INSERT [dbo].[aircraft] ([id], [model], [business_seats], [economy_seats], [image], [description]) VALUES (1, N'Airbus A320', 12, 108, N'https://s9.travelask.ru/system/images/files/001/517/563/wysiwyg_jpg/obzor-parka-samoletov-s7-airlines-10.jpg?1644498791', N'Среднемагистральный пассажирский самолет Airbus A320 (Аэробус А320) разработан европейским авиастроительным концерном Airbus в середине 1980-х годов. В конструкцию лайнера было заложено множество технических новинок. A320 стал первым в мире пассажирским самолетом с электродистанционной системой управления (кабина экипажа оснащена боковыми рукоятками управления вместо привычных штурвалов). Также в конструкции самолета впервые были широко применены композитные материалы.

Первая версия авиалайнера Airbus A320-100 была произведена лишь в количестве 21 штук. Практически сразу основной модификацией самолета стал оборудованный дополнительными топливными баками Airbus A320-200.

Аэробус А320 является базовой моделью семейства среднемагистральных самолетов Airbus, включающего также модели A318, A319, A321. Использование передовых технологий предопределили успех проекта. Первые Airbus A320 вышли на воздушные линии в 1988 г. С тех пор самолет выпускается в больших количествах, порой достигая рекордных темпов производства для гражданского самолетостроения (более 40 самолетов в месяц). В настоящее время построено уже более 2000 Airbus A320, а количество заказов превысило 4000.

Конструкция авиалайнера продолжает совершенствоваться. Несколько лет назад на крылья самолетов стали устанавливаться специальные законцовки "Sharklets" (шарклеты), которые позволяют снизить расход топлива при полетах на длинные дистанции. А в начале 2010-х гг. была проведена глубокая модернизация Аэробуса А320, результатом которой стало появление новейшей модели Airbus A320neo.')
INSERT [dbo].[aircraft] ([id], [model], [business_seats], [economy_seats], [image], [description]) VALUES (4, N'Airbus A320 NEO', 16, 132, N'https://www.airlines-inform.ru/images/seatmaps/s7-A320neo-seat-map.jpg', N'Airbus A320neo (Аэробус А320нео) - базовая модель нового семейства среднемагистральных пассажирских самолетов разработки европейского концерна Airbus. A320neo представляет из себя глубокую модернизацию популярного авиалайнера Airbus A320 с двигателями нового поколения, улучшенными бортовыми системами и более крупными законцовками крыла (шарклетами).

Первые самолеты A320neo поступили в коммерческую эксплуатацию в 2016 году. В настоящее время серийное производство продолжается высокими темпами. Вместе с данной моделью, в семейство A320neo входят укороченная версия авиалайнера A319neo и удлиненный A321neo.')
SET IDENTITY_INSERT [dbo].[aircraft] OFF
GO
SET IDENTITY_INSERT [dbo].[airline] ON 

INSERT [dbo].[airline] ([id], [name], [image]) VALUES (1, N'Аэрофлот', N'https://upload.wikimedia.org/wikipedia/commons/5/5c/Aeroflot_logo_%28en%29.png')
INSERT [dbo].[airline] ([id], [name], [image]) VALUES (2, N'Газпром авиа', N'https://upload.wikimedia.org/wikipedia/commons/3/39/Gazprom_Avia_Logo.svg')
INSERT [dbo].[airline] ([id], [name], [image]) VALUES (6, N'Победа', N'https://upload.wikimedia.org/wikipedia/commons/6/6a/Pobeda_logo.svg')
INSERT [dbo].[airline] ([id], [name], [image]) VALUES (8, N'Россия', N'https://upload.wikimedia.org/wikipedia/commons/e/ee/Rossiya_Airlines_logo.svg')
INSERT [dbo].[airline] ([id], [name], [image]) VALUES (9, N'S7 Airlines', N'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/S7_new_logo.svg/1200px-S7_new_logo.svg.png')
INSERT [dbo].[airline] ([id], [name], [image]) VALUES (10, N'Уральские авиалинии', N'https://tadviser.ru/images/e/e6/Ural_airlines.png')
SET IDENTITY_INSERT [dbo].[airline] OFF
GO
SET IDENTITY_INSERT [dbo].[airport] ON 

INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (1, N'AAQ', N'Витязево
', 1)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (2, N'ABA', N'Абакан
', 2)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (3, N'ACS', N'Ачинск
', 3)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (4, N'ADH', N'Алдан
', 4)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (5, N'AER', N'Адлер - Сочи
', 5)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (6, N'AMV', N'Амдерма
', 6)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (7, N'ARH', N'Талаги', 7)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (8, N'ASF', N'Астрахань', 8)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (9, N'BAX', N'Барнаул', 9)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (10, N'BCX', N'Белорецк', 10)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (11, N'VKO', N'Внуково
', 11)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (12, N'SVO', N'Шереметьево
', 11)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (13, N'DME', N'Домодедово
', 11)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (14, N'BQS', N'Игнатьево
', 12)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (15, N'BTK', N'Братск
', 13)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (16, N'BWO', N'Балаково
', 14)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (17, N'CKL', N'Чкаловский
', 19)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (18, N'NER', N'Чульман', 20)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (19, N'CSH', N'Соловецкий
', 21)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (20, N'CSY', N'Чебоксары
', 22)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (21, N'CYX', N'Черский
', 23)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (22, N'DKS', N'Диксон
', 24)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (23, N'DYR', N'DYR', 25)
INSERT [dbo].[airport] ([id], [code], [name], [city_id]) VALUES (24, N'SVX', N'Кольцово', 36)
SET IDENTITY_INSERT [dbo].[airport] OFF
GO
SET IDENTITY_INSERT [dbo].[city] ON 

INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (1, N'Анапа
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (2, N'Абакан
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (3, N'Ачинск
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (4, N'Алдан
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (5, N'Адлер
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (6, N'Амдерма
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (7, N'Архангельск
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (8, N'Астрахань
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (9, N'Барнаул
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (10, N'Белорецк
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (11, N'Москва
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (12, N'Благовещенск
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (13, N'Братск
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (14, N'Балаково
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (15, N'Брянск
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (19, N'Чкаловский
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (20, N'Нерюнгри', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (21, N'Соловецкий
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (22, N'Чебоксары
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (23, N'Черский
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (24, N'Диксон
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (25, N'Анадырь
', 1)
INSERT [dbo].[city] ([id], [name], [country_id]) VALUES (36, N'Екатеринбург', 1)
SET IDENTITY_INSERT [dbo].[city] OFF
GO
SET IDENTITY_INSERT [dbo].[client] ON 

INSERT [dbo].[client] ([id], [name], [surname], [lastname], [passport_id]) VALUES (72, N'Eliazabeth', N'Tokareva', N'Aleksandrovna', 136)
INSERT [dbo].[client] ([id], [name], [surname], [lastname], [passport_id]) VALUES (73, N'Varganov', N'Matvey', N'Alekseevich', 139)
INSERT [dbo].[client] ([id], [name], [surname], [lastname], [passport_id]) VALUES (74, N'VIKTOR', N'KONONENKO', N'ALEKSEEVICH', 140)
INSERT [dbo].[client] ([id], [name], [surname], [lastname], [passport_id]) VALUES (75, N'Andrey', N'Miheev', N'Alekseevich', 141)
SET IDENTITY_INSERT [dbo].[client] OFF
GO
SET IDENTITY_INSERT [dbo].[contact] ON 

INSERT [dbo].[contact] ([id], [email], [number]) VALUES (99, N'liza@mail.ru', N'79124324324')
INSERT [dbo].[contact] ([id], [email], [number]) VALUES (100, N'swe@mail.ru', N'89256453266')
INSERT [dbo].[contact] ([id], [email], [number]) VALUES (101, N'Spuder@mail.ri', N'78943243243')
INSERT [dbo].[contact] ([id], [email], [number]) VALUES (102, N'yo@mail.ru', N'73454354354')
INSERT [dbo].[contact] ([id], [email], [number]) VALUES (103, N'konon@mail.ru', N'79127895734')
INSERT [dbo].[contact] ([id], [email], [number]) VALUES (104, N'miheev@mail.ru', N'79124893243')
SET IDENTITY_INSERT [dbo].[contact] OFF
GO
SET IDENTITY_INSERT [dbo].[country] ON 

INSERT [dbo].[country] ([id], [name]) VALUES (1, N'Россия')
SET IDENTITY_INSERT [dbo].[country] OFF
GO
SET IDENTITY_INSERT [dbo].[passport] ON 

INSERT [dbo].[passport] ([id], [birthdate], [citizenship_id], [number], [country_of_issue_id], [validity_period]) VALUES (136, CAST(N'2000-07-28' AS Date), 1, N'6520574835', 1, CAST(N'2023-03-29' AS Date))
INSERT [dbo].[passport] ([id], [birthdate], [citizenship_id], [number], [country_of_issue_id], [validity_period]) VALUES (137, CAST(N'2000-07-28' AS Date), 1, N'6514562368', 1, CAST(N'2023-03-31' AS Date))
INSERT [dbo].[passport] ([id], [birthdate], [citizenship_id], [number], [country_of_issue_id], [validity_period]) VALUES (138, CAST(N'2010-12-01' AS Date), 1, N'4389712564', 1, CAST(N'2023-03-30' AS Date))
INSERT [dbo].[passport] ([id], [birthdate], [citizenship_id], [number], [country_of_issue_id], [validity_period]) VALUES (139, CAST(N'2010-12-08' AS Date), 1, N'4324325632', 1, CAST(N'2023-03-29' AS Date))
INSERT [dbo].[passport] ([id], [birthdate], [citizenship_id], [number], [country_of_issue_id], [validity_period]) VALUES (140, CAST(N'2003-06-10' AS Date), 1, N'6517903673', 1, CAST(N'2025-08-05' AS Date))
INSERT [dbo].[passport] ([id], [birthdate], [citizenship_id], [number], [country_of_issue_id], [validity_period]) VALUES (141, CAST(N'2003-12-31' AS Date), 1, N'6517432980', 1, CAST(N'2028-03-16' AS Date))
SET IDENTITY_INSERT [dbo].[passport] OFF
GO
SET IDENTITY_INSERT [dbo].[registration] ON 

INSERT [dbo].[registration] ([id], [route_id], [code], [client_id], [contact_id], [tariff_id], [seat], [price], [registered]) VALUES (29, 1, N'5JECJV17', 72, 99, 4, N'C1', 10800.0000, 1)
INSERT [dbo].[registration] ([id], [route_id], [code], [client_id], [contact_id], [tariff_id], [seat], [price], [registered]) VALUES (30, 15, N'E8CCMP17', 72, 100, 18, N'A1', 24000.0000, 0)
INSERT [dbo].[registration] ([id], [route_id], [code], [client_id], [contact_id], [tariff_id], [seat], [price], [registered]) VALUES (31, 16, N'E8CCMP17', 72, 100, 18, N'C1', 24000.0000, 0)
INSERT [dbo].[registration] ([id], [route_id], [code], [client_id], [contact_id], [tariff_id], [seat], [price], [registered]) VALUES (32, 15, N'43MLM017', 73, 102, 8, N'C13', 8000.0000, 0)
INSERT [dbo].[registration] ([id], [route_id], [code], [client_id], [contact_id], [tariff_id], [seat], [price], [registered]) VALUES (33, 15, N'4EXZCM17', 74, 103, 11, N'F1', 12800.0000, 1)
INSERT [dbo].[registration] ([id], [route_id], [code], [client_id], [contact_id], [tariff_id], [seat], [price], [registered]) VALUES (34, 4, N'YGK5DL47', 75, 104, 28, N'A1', 16800.0000, 0)
INSERT [dbo].[registration] ([id], [route_id], [code], [client_id], [contact_id], [tariff_id], [seat], [price], [registered]) VALUES (35, 16, N'YGK5DL47', 75, 104, 18, N'D2', 24000.0000, 0)
SET IDENTITY_INSERT [dbo].[registration] OFF
GO
SET IDENTITY_INSERT [dbo].[route] ON 

INSERT [dbo].[route] ([id], [airline_id], [start_time], [end_time], [price], [code], [time_in_fly], [aircraft_id], [boarding_gate], [start_airport_id], [end_airport_id]) VALUES (1, 1, CAST(N'2023-03-30T22:00:00.000' AS DateTime), CAST(N'2023-03-30T22:00:00.000' AS DateTime), 6000.0000, N'SU 2999', 60, 4, N'Gate 2', 24, 1)
INSERT [dbo].[route] ([id], [airline_id], [start_time], [end_time], [price], [code], [time_in_fly], [aircraft_id], [boarding_gate], [start_airport_id], [end_airport_id]) VALUES (4, 2, CAST(N'2023-03-30T21:00:00.000' AS DateTime), CAST(N'2023-03-30T21:00:00.000' AS DateTime), 7000.0000, N'SU 1512', 120, 4, N'Gate 1', 24, 1)
INSERT [dbo].[route] ([id], [airline_id], [start_time], [end_time], [price], [code], [time_in_fly], [aircraft_id], [boarding_gate], [start_airport_id], [end_airport_id]) VALUES (15, 9, CAST(N'2023-04-05T13:00:00.000' AS DateTime), CAST(N'2023-04-05T17:20:00.000' AS DateTime), 8000.0000, N'SU 5622', 320, 4, N'Gate 28', 1, 24)
INSERT [dbo].[route] ([id], [airline_id], [start_time], [end_time], [price], [code], [time_in_fly], [aircraft_id], [boarding_gate], [start_airport_id], [end_airport_id]) VALUES (16, 10, CAST(N'2023-04-05T09:00:00.000' AS DateTime), CAST(N'2023-04-05T15:20:00.000' AS DateTime), 8000.0000, N'SU 1233', 320, 4, N'Gate 4', 1, 24)
SET IDENTITY_INSERT [dbo].[route] OFF
GO
SET IDENTITY_INSERT [dbo].[tariff] ON 

INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (1, 1, N'Эконом Лайт', 1, 0, 1, 0, 0, 100, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (2, 1, N'Эконом Оптимум', 1, 1, 1, 0, 0, 150, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (4, 1, N'Бизнес', 1, 1, 1, 1, 1, 180, 1, 1, 1, 1)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (5, 6, N'Базовый', 1, 0, 1, 0, 0, 100, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (6, 6, N'Выгодный', 1, 1, 1, 0, 0, 140, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (7, 6, N'Максимум', 1, 1, 1, 1, 1, 170, 1, 1, 1, 1)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (8, 9, N'Эконом Базовый', 1, 0, 0, 0, 0, 100, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (9, 9, N'Эконом Стандарт', 1, 1, 0, 0, 0, 140, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (11, 9, N'Эконом Плюс', 1, 1, 0, 1, 1, 160, 1, 1, 1, 1)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (15, 10, N'ПРОМО', 1, 0, 1, 1, 1, 100, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (16, 10, N'ЭКОНОМ', 1, 1, 1, 1, 1, 125, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (18, 10, N'БИЗНЕС', 1, 1, 1, 1, 1, 300, 1, 1, 1, 1)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (21, 8, N'Эконом', 1, 0, 0, 0, 0, 120, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (22, 8, N'Комфортный', 0, 1, 1, 0, 0, 160, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (25, 8, N'Всё включено', 1, 1, 1, 1, 1, 250, 1, 1, 1, 1)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (26, 2, N'Базовый эконом', 1, 0, 0, 0, 0, 150, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (27, 2, N'Базовый', 1, 1, 1, 0, 1, 180, 0, 1, 0, 0)
INSERT [dbo].[tariff] ([id], [airline_id], [name], [hand_luggage], [luggage], [meal], [rebooking], [refund], [markup], [insurance], [seat_choice], [vip_lounge], [boarding_priority]) VALUES (28, 2, N'Ультра', 1, 1, 1, 1, 1, 240, 1, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[tariff] OFF
GO
ALTER TABLE [dbo].[airport]  WITH CHECK ADD  CONSTRAINT [city_to_city_id] FOREIGN KEY([city_id])
REFERENCES [dbo].[city] ([id])
GO
ALTER TABLE [dbo].[airport] CHECK CONSTRAINT [city_to_city_id]
GO
ALTER TABLE [dbo].[city]  WITH CHECK ADD  CONSTRAINT [country_to_country_id] FOREIGN KEY([country_id])
REFERENCES [dbo].[country] ([id])
GO
ALTER TABLE [dbo].[city] CHECK CONSTRAINT [country_to_country_id]
GO
ALTER TABLE [dbo].[client]  WITH CHECK ADD  CONSTRAINT [passport_to_client_passport_id] FOREIGN KEY([passport_id])
REFERENCES [dbo].[passport] ([id])
GO
ALTER TABLE [dbo].[client] CHECK CONSTRAINT [passport_to_client_passport_id]
GO
ALTER TABLE [dbo].[passport]  WITH CHECK ADD  CONSTRAINT [country_to_citizenship_id] FOREIGN KEY([citizenship_id])
REFERENCES [dbo].[country] ([id])
GO
ALTER TABLE [dbo].[passport] CHECK CONSTRAINT [country_to_citizenship_id]
GO
ALTER TABLE [dbo].[passport]  WITH CHECK ADD  CONSTRAINT [country_to_countryofissue_id] FOREIGN KEY([country_of_issue_id])
REFERENCES [dbo].[country] ([id])
GO
ALTER TABLE [dbo].[passport] CHECK CONSTRAINT [country_to_countryofissue_id]
GO
ALTER TABLE [dbo].[registration]  WITH CHECK ADD  CONSTRAINT [client_to_regisration_client_id] FOREIGN KEY([client_id])
REFERENCES [dbo].[client] ([id])
GO
ALTER TABLE [dbo].[registration] CHECK CONSTRAINT [client_to_regisration_client_id]
GO
ALTER TABLE [dbo].[registration]  WITH CHECK ADD  CONSTRAINT [contact_to_registration_contact_id] FOREIGN KEY([contact_id])
REFERENCES [dbo].[contact] ([id])
GO
ALTER TABLE [dbo].[registration] CHECK CONSTRAINT [contact_to_registration_contact_id]
GO
ALTER TABLE [dbo].[registration]  WITH CHECK ADD  CONSTRAINT [FK_registration_route] FOREIGN KEY([route_id])
REFERENCES [dbo].[route] ([id])
GO
ALTER TABLE [dbo].[registration] CHECK CONSTRAINT [FK_registration_route]
GO
ALTER TABLE [dbo].[registration]  WITH CHECK ADD  CONSTRAINT [tariff_to_registration_tariff_id] FOREIGN KEY([tariff_id])
REFERENCES [dbo].[tariff] ([id])
GO
ALTER TABLE [dbo].[registration] CHECK CONSTRAINT [tariff_to_registration_tariff_id]
GO
ALTER TABLE [dbo].[route]  WITH CHECK ADD  CONSTRAINT [FK_route_aircraft] FOREIGN KEY([aircraft_id])
REFERENCES [dbo].[aircraft] ([id])
GO
ALTER TABLE [dbo].[route] CHECK CONSTRAINT [FK_route_aircraft]
GO
ALTER TABLE [dbo].[route]  WITH CHECK ADD  CONSTRAINT [FK_route_airline] FOREIGN KEY([airline_id])
REFERENCES [dbo].[airline] ([id])
GO
ALTER TABLE [dbo].[route] CHECK CONSTRAINT [FK_route_airline]
GO
ALTER TABLE [dbo].[route]  WITH CHECK ADD  CONSTRAINT [FK_route_airport] FOREIGN KEY([start_airport_id])
REFERENCES [dbo].[airport] ([id])
GO
ALTER TABLE [dbo].[route] CHECK CONSTRAINT [FK_route_airport]
GO
ALTER TABLE [dbo].[route]  WITH CHECK ADD  CONSTRAINT [FK_route_airport1] FOREIGN KEY([end_airport_id])
REFERENCES [dbo].[airport] ([id])
GO
ALTER TABLE [dbo].[route] CHECK CONSTRAINT [FK_route_airport1]
GO
ALTER TABLE [dbo].[tariff]  WITH CHECK ADD  CONSTRAINT [airline_to_tariff_airline_id] FOREIGN KEY([airline_id])
REFERENCES [dbo].[airline] ([id])
GO
ALTER TABLE [dbo].[tariff] CHECK CONSTRAINT [airline_to_tariff_airline_id]
GO
USE [master]
GO
ALTER DATABASE [vaerochka] SET  READ_WRITE 
GO
