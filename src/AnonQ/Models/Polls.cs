﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AnonQ.Models
{
    public class Polls
    {
        public int Id { get; set; }
        public int QuestionId { get; set; }
        public string Poll { get; set; }
        public int Votes { get; set; }
    }
}
